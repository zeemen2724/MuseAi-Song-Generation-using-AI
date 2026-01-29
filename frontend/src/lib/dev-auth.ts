/**
 * TEMPORARY DEV-ONLY AUTHENTICATION
 * 
 * ⚠️ FOR DEVELOPMENT ENVIRONMENT ONLY ⚠️
 * 
 * This is a temporary authentication system to allow testing the Studio UI
 * without requiring real backend authentication. This should be completely
 * removed and replaced with real auth (NextAuth/Clerk/Supabase) before production.
 * 
 * How it works:
 * 1. Hardcoded dev credentials are checked on login
 * 2. On successful login, sets localStorage and a cookie for server-side access
 * 3. getCurrentUser() checks the cookie to determine auth state
 * 
 * To remove later:
 * - Delete this file
 * - Remove dev credential check from login page
 * - Replace getCurrentUser() with real session lookup
 */

export const DEV_USER = {
  email: "dev@example.com",
  password: "dev12345",
} as const;

export const DEV_AUTH_COOKIE_NAME = "dev-auth";
export const DEV_AUTH_STORAGE_KEY = "dev-auth";

/**
 * Sets the dev auth flag in both localStorage (client) and cookie (server-readable)
 */
export function setDevAuth() {
  if (typeof window === "undefined") return;
  
  // Set localStorage for client-side checks
  localStorage.setItem(DEV_AUTH_STORAGE_KEY, "true");
  
  // Set cookie for server-side checks (expires in 7 days)
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  document.cookie = `${DEV_AUTH_COOKIE_NAME}=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  
  // Dispatch custom event to notify components of auth state change
  window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: { authenticated: true } }));
}

/**
 * Removes the dev auth flag from both localStorage and cookie
 */
export function clearDevAuth() {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem(DEV_AUTH_STORAGE_KEY);
  document.cookie = `${DEV_AUTH_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  
  // Dispatch custom event to notify components of auth state change
  window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: { authenticated: false } }));
}

/**
 * Checks if dev auth is active (client-side)
 */
export function isDevAuthActive(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(DEV_AUTH_STORAGE_KEY) === "true";
}

/**
 * Validates dev credentials
 */
export function validateDevCredentials(email: string, password: string): boolean {
  return email === DEV_USER.email && password === DEV_USER.password;
}

