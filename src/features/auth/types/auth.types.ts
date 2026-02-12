// src/features/auth/types/auth.types.ts

// ===============================
//  Rollen / Plan-Tier (optional)
// ===============================

export type Role = "user" | "admin" | "support" | "system" | string;
export type PlanTier = "FREE" | "PREMIUM" | "PRO" | string;

// ===============================
//  Basis-User-Typ vom Backend
// ===============================

export interface User {
  id: string;
  email: string;

  // Optional, je nach Backend
  emailVerified?: boolean;
  tenantId?: string;
  roles: Role[];
  planTier?: PlanTier;

  displayName?: string;
  avatarUrl?: string;

  createdAt?: string;
  updatedAt?: string;
}

// Alias für alten Namen
export type AuthUser = User;

// ===============================
//  Tokens & klassische AuthResponse
// ===============================

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Klassische AuthResponse, wie du sie in login.ts, magicLinkConsume.ts,
 * otpVerify.ts, refresh.ts usw. benutzt.
 */
export interface AuthResponse extends AuthTokens {
  user: AuthUser;
}

// ===============================
//  Login
// ===============================

export interface LoginPayload {
  email: string;
  password: string;
}

// Für neue APIs kannst du LoginResponse verwenden,
// alte Imports nutzen weiterhin AuthResponse.
export interface LoginResponse extends AuthResponse {}

// ===============================
//  Registrierung
// ===============================

export interface RegisterPayload {
  email: string;
  password: string;
}

/**
 * Backend kann bei Register z.B. nur message schicken
 * oder direkt Tokens + User.
 */
export interface RegisterResponse {
  message: string;
  accessToken?: string;
  refreshToken?: string;
  user?: AuthUser;
}

// ===============================
//  E-Mail-Verifikation
// ===============================

export interface EmailVerifyRequestPayload {
  email: string;
}

export interface EmailVerifyConfirmPayload {
  token: string;
}

export interface EmailVerifyResponse {
  success: boolean;
  message: string;
}

// ===============================
//  Magic-Link Login
// ===============================

export interface MagicLinkRequestPayload {
  email: string;
}

export interface MagicLinkConsumePayload {
  token: string;
}

export interface MagicLinkResponse extends AuthResponse {}

// ===============================
//  OTP Login
// ===============================

export interface OtpRequestPayload {
  email: string;
}

export interface OtpVerifyPayload {
  email: string;
  code: string;
}

export interface OtpVerifyResponse extends AuthResponse {}

// ===============================
//  Passwort / Reset
// ===============================

export interface PasswordForgotPayload {
  email: string;
}

export interface PasswordResetPayload {
  token: string;
  password: string;
}

export interface PasswordChangePayload {
  currentPassword: string;
  newPassword: string;
}

export interface PasswordResponse {
  success: boolean;
  message: string;
}

// ===============================
//  Sessions
// ===============================

export interface Session {
  id: string;
  ip: string;
  device: string;
  createdAt: string;
  lastUsedAt: string;
  isCurrent: boolean;
}

// Alias für alten Import-Namen
export type SessionInfo = Session;

export interface SessionsListResponse {
  sessions: Session[];
}

export interface SessionRevokePayload {
  sessionId: string;
}

export interface SessionRevokeResponse {
  success: boolean;
  message: string;
}

// ===============================
//  Tenants (Multi-Tenant)
// ===============================

export interface TenantInfo {
  id: string;
  name: string;
  domain?: string;
  createdAt: string;
}

export interface TenantListResponse {
  tenants: TenantInfo[];
}

export interface TenantMeResponse {
  tenant: TenantInfo;
}

export interface TenantBootstrapPayload {
  name: string;
}

export interface TenantBootstrapResponse {
  tenantId: string;
  tenant?: TenantInfo;
  message?: string;
}

// ===============================
//  Health / Cleanup
// ===============================

export interface HealthResponse {
  status: "ok" | "error";
  message?: string;
}

export interface TokenCleanupResponse {
  removed: number;
  status: string;
}

// ===============================
//  Auth-Context (Frontend)
// ===============================

export interface AuthContextState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthContextActions {
  loginWithResponse: (
    response:
      | AuthResponse
      | LoginResponse
      | RegisterResponse
      | MagicLinkResponse
      | OtpVerifyResponse
  ) => void;
  logout: () => void;
}

export type AuthContextType = AuthContextState & AuthContextActions;
