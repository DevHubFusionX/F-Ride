"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import api from "@/lib/api/axios-client";

/* ────────────────────────────────────────────────────────────── */
/* ─── Types                                                 ─── */
/* ────────────────────────────────────────────────────────────── */

export type UserRole = "rider" | "driver" | "courier";

export interface AuthUser {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  role: UserRole;
  isVerified: boolean;
  profileImage?: string;
  rating?: number;
  tripsCount?: number;
  joinedDate?: string;
  bio?: string;
  twoFactorEnabled?: boolean;
  languages?: string[];
  vehicle?: {
    model: string;
    color: string;
    plate: string;
  };
}

interface AuthContextType {
  /** Current authenticated user, or null when logged out / loading */
  user: AuthUser | null;
  /** JWT access token */
  token: string | null;
  /** True while the initial session is being validated */
  isLoading: boolean;
  /** Shorthand for `!!user` */
  isAuthenticated: boolean;
  /** Persist session after successful OTP verification */
  login: (token: string, userData: AuthUser) => void;
  /** Clear session and redirect to login */
  logout: () => void;
  /** Optimistically update local user data (e.g. after profile edit) */
  updateUser: (patch: Partial<AuthUser>) => void;
}

/* ────────────────────────────────────────────────────────────── */
/* ─── Constants                                             ─── */
/* ────────────────────────────────────────────────────────────── */

const TOKEN_KEY = "fr_token";
const USER_KEY = "fr_user";

/* ────────────────────────────────────────────────────────────── */
/* ─── Context                                               ─── */
/* ────────────────────────────────────────────────────────────── */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ────────────────────────────────────────────────────────────── */
/* ─── Provider                                              ─── */
/* ────────────────────────────────────────────────────────────── */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* ── Persist helpers ── */

  const persistSession = useCallback((newToken: string, userData: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  /* ── Public actions ── */

  const login = useCallback(
    (newToken: string, userData: AuthUser) => {
      persistSession(newToken, userData);
    },
    [persistSession]
  );

  const logout = useCallback(() => {
    clearSession();
    // Use replace to prevent back-button returning to protected page
    if (typeof window !== "undefined") {
      window.location.replace("/login");
    }
  }, [clearSession]);

  const updateUser = useCallback(
    (patch: Partial<AuthUser>) => {
      setUser((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, ...patch };
        localStorage.setItem(USER_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  /* ── Hydrate session on mount ── */

  useEffect(() => {
    const hydrate = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (!storedToken || !storedUser) {
        setIsLoading(false);
        return;
      }

      // Optimistically restore cached user while we validate
      try {
        const cachedUser: AuthUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(cachedUser);
      } catch {
        clearSession();
        setIsLoading(false);
        return;
      }

      // Validate token with the backend
      try {
        const { data } = await api.get("/auth/me");
        // Refresh local cache with latest server data
        const freshUser: AuthUser = data;
        setUser(freshUser);
        localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
      } catch {
        // Token is invalid or expired — clear everything
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    hydrate();
  }, [clearSession]);

  /* ── Listen for global 401 events from the axios interceptor ── */

  useEffect(() => {
    const handleForceLogout = () => {
      clearSession();
    };

    window.addEventListener("auth:logout", handleForceLogout);
    return () => window.removeEventListener("auth:logout", handleForceLogout);
  }, [clearSession]);

  /* ── Memoized context value ── */

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: !!user,
      login,
      logout,
      updateUser,
    }),
    [user, token, isLoading, login, logout, updateUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* ─── Hook                                                  ─── */
/* ────────────────────────────────────────────────────────────── */

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
