export interface GatewayErrorEnvelope {
  status?: number;
  error?: {
    code?: string;
    message?: string;
  };
  request_id?: string;
}

let lastRequestId: string | undefined;

export function setLastRequestId(requestId: string | undefined): void {
  if (!requestId) {
    return;
  }
  lastRequestId = requestId;
}

export function getLastRequestId(): string | undefined {
  return lastRequestId;
}

export class ApiError extends Error {
  status: number;
  code: string;
  requestId?: string;
  path: string;
  detail?: string;

  constructor(opts: {
    status: number;
    code: string;
    message: string;
    path: string;
    requestId?: string;
    detail?: string;
  }) {
    super(opts.message);
    this.name = "ApiError";
    this.status = opts.status;
    this.code = opts.code;
    this.requestId = opts.requestId;
    this.path = opts.path;
    this.detail = opts.detail;
  }
}

export function isGatewayErrorEnvelope(payload: unknown): payload is GatewayErrorEnvelope {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const value = payload as GatewayErrorEnvelope;
  return (
    typeof value.status === "number" &&
    typeof value.error?.code === "string" &&
    typeof value.error?.message === "string"
  );
}

export function supportCodeForError(error: unknown): string | undefined {
  if (error instanceof ApiError) {
    return error.requestId;
  }

  return getLastRequestId();
}

export function supportInfoText(error: unknown): string {
  const code = supportCodeForError(error);
  const route = `${window.location.pathname}${window.location.search}`;
  const timestamp = new Date().toISOString();
  return [
    `Support-Code: ${code ?? "n/a"}`,
    `Route: ${route}`,
    `Zeitpunkt: ${timestamp}`,
  ].join("\n");
}
