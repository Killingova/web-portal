const API_BASE_PATH_RAW =
  (import.meta.env.VITE_API_BASE_PATH as string | undefined)?.trim() || "";

if (API_BASE_PATH_RAW && !API_BASE_PATH_RAW.startsWith("/")) {
  throw new Error("VITE_API_BASE_PATH must be empty or start with '/'.");
}

const API_BASE_PATH =
  API_BASE_PATH_RAW === "/" ? "" : API_BASE_PATH_RAW.replace(/\/+$/, "");

function toApiUrl(path: string): string {
  if (!path.startsWith("/")) {
    throw new Error("API path must start with '/'.");
  }
  return `${API_BASE_PATH}${path}`;
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
  const accessToken = localStorage.getItem("access_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const res = await fetch(toApiUrl(path), {
    ...options,
    headers,
  });

  if (res.status === 204) {
    return undefined as unknown as T;
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `HTTP ${res.status} ${res.statusText} for ${path}: ${text}`
    );
  }

  return (await res.json()) as T;
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
