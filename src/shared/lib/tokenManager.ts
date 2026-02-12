let accessTokenInMemory: string | null = null;

export function storeTokens(accessToken: string, _refreshToken?: string): void {
  accessTokenInMemory = accessToken;
}

export function getAccessToken(): string | null {
  return accessTokenInMemory;
}

export function getRefreshToken(): string | null {
  return null;
}

export function clearTokens(): void {
  accessTokenInMemory = null;
}
