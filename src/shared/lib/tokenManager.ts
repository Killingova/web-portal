const ACCESS_TOKEN_KEY = "access_token";

export function storeTokens(accessToken: string, _refreshToken?: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return null;
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}
