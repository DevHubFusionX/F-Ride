import axios, { type AxiosRequestConfig } from "axios";

// In production on Vercel, requests go through the Next.js proxy at /api
// which forwards server-side to Render — no CORS, no missing env vars.
// In local dev, hit the backend directly.
const IS_BROWSER = typeof window !== "undefined";
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api")
    : "/api";

const COLD_START_TIMEOUT = 90_000;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: COLD_START_TIMEOUT,
});

// Ping health endpoint to wake a sleeping Render free-tier instance
export async function wakeServer(): Promise<void> {
  if (!IS_BROWSER) return;
  const healthUrl =
    process.env.NODE_ENV === "development"
      ? `${BASE_URL}/health`
      : "/api/health";
  try {
    await axios.get(healthUrl, { timeout: COLD_START_TIMEOUT });
  } catch {
    // Ignore — the actual request will handle any remaining failure
  }
}

// Retry a request once after waking the server on network timeout
async function retryAfterWake(config: AxiosRequestConfig) {
  await wakeServer();
  return axios({ ...config, baseURL: BASE_URL, timeout: COLD_START_TIMEOUT });
}

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
  async (error) => {
    const status = error.response?.status;
    const config = error.config;

    // On network timeout/error with no response, wake the server and retry once
    if (!error.response && !config?._retried) {
      config._retried = true;
      if (process.env.NODE_ENV === "development") {
        console.warn(`[API] Network error on ${config?.url} — waking server and retrying...`);
      }
      try {
        return await retryAfterWake(config);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.error(`[API ✕] ${status ?? "NETWORK"} ${config?.url ?? "unknown"} — ${error.message}`);
    }

    if (status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }

    return Promise.reject(error);
  }
);

export default api;

