import {
  ApiError,
  getLastRequestId,
  isGatewayErrorEnvelope,
  setLastRequestId,
} from "./apiError";
import { getRuntimeConfig } from "./runtimeConfig";
import { getAccessToken } from "./tokenManager";

const API_BASE_PATH_ENV_RAW =
  (import.meta.env.VITE_API_BASE_PATH as string | undefined)?.trim() || "";

if (API_BASE_PATH_ENV_RAW && !API_BASE_PATH_ENV_RAW.startsWith("/")) {
  throw new Error("VITE_API_BASE_PATH must be empty or start with '/'.");
}

const API_BASE_PATH_ENV =
  API_BASE_PATH_ENV_RAW === "/" ? "" : API_BASE_PATH_ENV_RAW.replace(/\/+$/, "");

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function resolveApiBasePath(): string {
  const runtimePath = getRuntimeConfig().apiBasePath;
  if (typeof runtimePath === "string") {
    if (runtimePath === "" || runtimePath.startsWith("/")) {
      return runtimePath;
    }
  }
  return API_BASE_PATH_ENV;
}

function getSelectedTenantId(): string | undefined {
  const raw = localStorage.getItem("tenant_id");
  if (!raw) {
    return undefined;
  }

  const normalized = raw.trim().toLowerCase();
  if (!UUID_RE.test(normalized)) {
    return undefined;
  }

  return normalized;
}

function getCsrfToken(): string | undefined {
  const fromMeta = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content")
    ?.trim();

  if (fromMeta) {
    return fromMeta;
  }

  const fromStorage = sessionStorage.getItem("csrf_token")?.trim();
  return fromStorage || undefined;
}

function toApiUrl(path: string): string {
  if (!path.startsWith("/")) {
    throw new Error("API path must start with '/'.");
  }
  return `${resolveApiBasePath()}${path}`;
}

async function parseErrorPayload(res: Response): Promise<{
  envelopeMessage?: string;
  envelopeCode?: string;
  requestId?: string;
  detail?: string;
}> {
  const contentType = (res.headers.get("content-type") || "").toLowerCase();
  const requestIdHeader = res.headers.get("x-request-id")?.trim() || undefined;
  let detail: string | undefined;

  try {
    if (contentType.includes("application/json")) {
      const payload = await res.json();
      if (isGatewayErrorEnvelope(payload)) {
        const requestId = payload.request_id?.trim() || requestIdHeader;
        return {
          envelopeMessage: payload.error?.message,
          envelopeCode: payload.error?.code,
          requestId,
          detail: JSON.stringify(payload),
        };
      }

      detail = JSON.stringify(payload);
    } else {
      detail = await res.text();
    }
  } catch {
    detail = undefined;
  }

  return {
    requestId: requestIdHeader,
    detail,
  };
}

/**
 * Zentraler HTTP-Client für alle Services.
 * - Hängt access_token automatisch an (Bearer)
 * - Typisiert über Generics
 */
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const accessToken = getAccessToken();
  const tenantId = getSelectedTenantId();
  const method = (options.method || "GET").toUpperCase();
  const csrfToken = getCsrfToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(tenantId ? { "X-Tenant-Id": tenantId } : {}),
    ...(csrfToken && method !== "GET" && method !== "HEAD" && method !== "OPTIONS"
      ? { "X-CSRF-Token": csrfToken }
      : {}),
  };

  const res = await fetch(toApiUrl(path), {
    ...options,
    headers,
  });

  const headerRequestId = res.headers.get("x-request-id")?.trim() || undefined;
  setLastRequestId(headerRequestId);

  if (res.status === 204) {
    return undefined as unknown as T;
  }

  if (!res.ok) {
    const parsed = await parseErrorPayload(res);
    if (parsed.requestId) {
      setLastRequestId(parsed.requestId);
    }

    const requestId = parsed.requestId || getLastRequestId();
    const supportSuffix = requestId ? ` Support-Code: ${requestId}.` : "";
    const message = parsed.envelopeMessage
      ? `${parsed.envelopeMessage}${supportSuffix}`
      : `HTTP ${res.status} ${res.statusText} for ${path}.${supportSuffix}`;

    // eslint-disable-next-line no-console
    console.error("[http]", {
      path,
      status: res.status,
      code: parsed.envelopeCode ?? "HTTP_ERROR",
      request_id: requestId,
    });

    throw new ApiError({
      status: res.status,
      code: parsed.envelopeCode ?? "HTTP_ERROR",
      message,
      path,
      requestId,
      detail: parsed.detail,
    });
  }

  const contentType = (res.headers.get("content-type") || "").toLowerCase();
  if (!contentType.includes("application/json")) {
    return (await res.text()) as unknown as T;
  }

  return await res.json() as T;
}

export const http = {
  get<T>(path: string): Promise<T> {
    return request<T>(path, { method: "GET" });
  },
  post<T>(path: string, body?: unknown): Promise<T> {
    return request<T>(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },
  patch<T>(path: string, body?: unknown): Promise<T> {
    return request<T>(path, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  },
};
