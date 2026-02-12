export interface RuntimeConfig {
  version: string;
  appName?: string;
  apiBasePath?: string;
  featureFlags: Record<string, boolean>;
}

const DEFAULT_CONFIG: RuntimeConfig = {
  version: "1",
  appName: "web-portal",
  apiBasePath: "",
  featureFlags: {},
};

let runtimeConfig: RuntimeConfig = DEFAULT_CONFIG;

function normalizeRelativeBasePath(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed === "/") {
    return "";
  }

  if (!trimmed.startsWith("/")) {
    return undefined;
  }

  return trimmed.replace(/\/+$/, "");
}

function normalizeFeatureFlags(value: unknown): Record<string, boolean> {
  if (!value || typeof value !== "object") {
    return {};
  }

  const result: Record<string, boolean> = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (typeof raw === "boolean") {
      result[key] = raw;
    }
  }

  return result;
}

export async function loadRuntimeConfig(): Promise<void> {
  try {
    const response = await fetch("/config.json", {
      method: "GET",
      cache: "no-store",
      credentials: "same-origin",
    });

    if (response.status === 404) {
      return;
    }

    if (!response.ok) {
      return;
    }

    const raw = (await response.json()) as Record<string, unknown>;
    const normalizedBasePath = normalizeRelativeBasePath(raw.apiBasePath);

    runtimeConfig = {
      version: typeof raw.version === "string" && raw.version.trim().length > 0
        ? raw.version.trim()
        : DEFAULT_CONFIG.version,
      appName: typeof raw.appName === "string" && raw.appName.trim().length > 0
        ? raw.appName.trim()
        : DEFAULT_CONFIG.appName,
      apiBasePath: normalizedBasePath ?? DEFAULT_CONFIG.apiBasePath,
      featureFlags: normalizeFeatureFlags(raw.featureFlags),
    };
  } catch {
    // Runtime config is optional; fallback stays deterministic.
  }
}

export function getRuntimeConfig(): RuntimeConfig {
  return runtimeConfig;
}
