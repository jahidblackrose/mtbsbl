/**
 * Environment & Feature Configuration
 * ====================================
 * All environment-dependent values live here.
 * Switching from MOCK → REAL requires ONLY changes in this file.
 */

export type ApiMode = "MOCK" | "REAL";

export const ENV = {
  /** Base URL for all API calls. Ignored in MOCK mode. */
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? "https://api.mtb-sbl.example.com",

  /** MOCK = use local demo data; REAL = call live backend */
  MODE: (import.meta.env.VITE_API_MODE ?? "MOCK") as ApiMode,

  /** Feature flags for gradual rollout */
  FEATURES: {
    CIB_MODULE: true,
    MGL_MODULE: true,
    REPORTS_EXPORT: false,
    NOTIFICATIONS_REALTIME: false,
  },
} as const;
