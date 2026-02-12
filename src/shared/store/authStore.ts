import type { AuthResponse, AuthUser, Role } from "../../features/auth/types/auth.types";

const DEFAULT_ROLE: Role = "user";

function normalizeRoleList(roles: unknown): Role[] {
  if (!Array.isArray(roles)) {
    return [DEFAULT_ROLE];
  }

  const normalized = roles
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter((value): value is Role => value.length > 0);

  return normalized.length > 0 ? normalized : [DEFAULT_ROLE];
}

export function normalizeAuthUser(user: Partial<AuthUser> | null | undefined): AuthUser {
  return {
    id: typeof user?.id === "string" ? user.id : "",
    email: typeof user?.email === "string" ? user.email : "",
    emailVerified: typeof user?.emailVerified === "boolean" ? user.emailVerified : undefined,
    tenantId: typeof user?.tenantId === "string" ? user.tenantId : undefined,
    roles: normalizeRoleList(user?.roles),
    planTier: typeof user?.planTier === "string" ? user.planTier : undefined,
    displayName: typeof user?.displayName === "string" ? user.displayName : undefined,
    avatarUrl: typeof user?.avatarUrl === "string" ? user.avatarUrl : undefined,
    createdAt: typeof user?.createdAt === "string" ? user.createdAt : undefined,
    updatedAt: typeof user?.updatedAt === "string" ? user.updatedAt : undefined,
  };
}

export function normalizeAuthResponse(response: AuthResponse): AuthResponse {
  return {
    ...response,
    user: normalizeAuthUser(response.user),
  };
}
