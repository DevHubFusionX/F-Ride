import axios from "axios";

/* ────────────────────────────────────────────────────────────── */
/* ─── Global Axios Instance                                 ─── */
/* ────────────────────────────────────────────────────────────── */

/**
 * Pre-configured Axios instance for all FrankRide API calls.
 *
 * - Base URL sourced from `NEXT_PUBLIC_API_URL` (defaults to local dev server).
 * - Automatically attaches the JWT token from localStorage on every request.
 * - Dispatches a custom `auth:logout` event on any 401 response so the
 *   AuthContext can clear the session reactively.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 60_000,
});

/* ────────────────────────────────────────────────────────────── */
/* ─── Request Interceptor                                   ─── */
/* ────────────────────────────────────────────────────────────── */

api.interceptors.request.use(
  (config) => {
    // Attach JWT if available
    const token =
      typeof window !== "undefined" ? localStorage.getItem("fr_token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Dev logger
    if (process.env.NODE_ENV === "development") {
      console.log(`[API →] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ────────────────────────────────────────────────────────────── */
/* ─── Response Interceptor                                  ─── */
/* ────────────────────────────────────────────────────────────── */

api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[API ←] ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "unknown";

    if (process.env.NODE_ENV === "development") {
      console.error(`[API ✕] ${status ?? "NETWORK"} ${url} — ${error.message}`);
    }

    // Global 401 handler: fire a custom event so AuthContext can react
    // without creating a circular import dependency.
    if (status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }

    return Promise.reject(error);
  }
);

export default api;

