import { cookies } from "next/headers";
import { DEV_AUTH_COOKIE_NAME } from "./dev-auth";

/**
 * Gets the current authenticated user
 * 
 * ⚠️ TEMPORARY DEV AUTH: This currently checks for a dev-auth cookie.
 * Replace this with real session lookup (NextAuth, Clerk, etc.) before production.
 */
export async function getCurrentUser() {
  // TEMPORARY DEV AUTH CHECK - Remove when real auth is implemented
  const cookieStore = await cookies();
  const devAuthCookie = cookieStore.get(DEV_AUTH_COOKIE_NAME);
  
  if (devAuthCookie?.value === "true") {
    return {
      id: "dev-user",
      email: "dev@example.com",
      name: "Dev User",
    };
  }
  
  // TODO: Replace with real auth provider check
  // Example for NextAuth:
  // const session = await getServerSession();
  // return session?.user || null;
  
  return null;
}

