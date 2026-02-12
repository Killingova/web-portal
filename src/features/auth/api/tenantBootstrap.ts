import { http } from "../../../shared/lib/httpClient";
import type { TenantBootstrapPayload, TenantBootstrapResponse, TenantInfo } from "../types/auth.types";

interface RawTenantBootstrapResponse {
  tenantId?: string;
  tenant_id?: string;
  tenant?: TenantInfo;
  message?: string;
}

export async function tenantBootstrap(
  payload: TenantBootstrapPayload
): Promise<TenantBootstrapResponse> {
  const response = await http.post<RawTenantBootstrapResponse>("/auth/tenants/bootstrap", payload);

  const tenantId = response.tenantId || response.tenant_id || response.tenant?.id;
  if (!tenantId) {
    throw new Error("Tenant bootstrap response has no tenant id.");
  }

  return {
    tenantId,
    tenant: response.tenant,
    message: response.message,
  };
}
