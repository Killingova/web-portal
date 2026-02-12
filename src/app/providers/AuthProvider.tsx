import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { AuthUser, AuthResponse } from "../../features/auth/types/auth.types";
import { clearTokens, getAccessToken, storeTokens } from "../../shared/lib/tokenManager";
import { getMyIdentity } from "../../features/auth/api/me";
import { normalizeAuthResponse, normalizeAuthUser } from "../../shared/store/authStore";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  loginWithResponse: (response: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      try {
        const token = getAccessToken();
        if (!token) {
          setLoading(false);
          return;
        }
        const me = await getMyIdentity();
        setUser(normalizeAuthUser(me));
      } catch {
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    bootstrap();
  }, []);

  function loginWithResponse(response: AuthResponse) {
    const normalized = normalizeAuthResponse(response);
    storeTokens(normalized.accessToken, normalized.refreshToken);
    setUser(normalized.user);
  }

  function logout() {
    clearTokens();
    setUser(null);
  }

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    loading,
    loginWithResponse,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
