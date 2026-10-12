/**
 * Central place for the API base URL.
 *
 * Vite exposes variables prefixed with VITE_ via import.meta.env.
 * Locally this is set to http://localhost:8080 in .env.development.
 * For deployment, set VITE_API_BASE_URL to your hosted backend URL.
 *
 * The fallback keeps things working even if the env var is missing.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
