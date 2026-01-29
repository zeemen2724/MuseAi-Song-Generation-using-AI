# Temporary Dev Authentication

⚠️ **FOR DEVELOPMENT ENVIRONMENT ONLY** ⚠️

This document describes the temporary authentication system implemented to allow testing the Studio UI without requiring real backend authentication.

## Overview

The temporary auth flow uses:
- **Hardcoded dev credentials** (client-side check)
- **localStorage** for client-side auth state
- **Cookies** for server-side auth checks (via `getCurrentUser()`)

## Dev Credentials

```
Email: dev@example.com
Password: dev12345
```

## How It Works

### 1. Login Flow (`src/app/auth/login/page.tsx`)

When a user enters credentials:
- Validates against hardcoded `DEV_USER` credentials
- On success:
  - Sets `localStorage.setItem("dev-auth", "true")`
  - Sets a cookie `dev-auth=true` (for server-side access)
  - Redirects to `/studio`

### 2. Server-Side Auth Check (`src/lib/auth.ts`)

The `getCurrentUser()` function:
- Checks for `dev-auth` cookie
- Returns a dev user object if cookie exists
- Returns `null` if not authenticated

### 3. Route Protection (`src/app/studio/page.tsx`)

The Studio route:
- Calls `getCurrentUser()` server-side
- Redirects to `/auth/login` if user is `null`
- Renders Studio UI if authenticated

### 4. Logout Flow

Logout functionality:
- Clears `localStorage` and cookie
- Redirects to home page
- Available in:
  - Navigation bar (when authenticated)
  - Dashboard sidebar

## Files Modified

### New Files
- `src/lib/dev-auth.ts` - Dev auth utilities and constants

### Modified Files
- `src/lib/auth.ts` - Updated to check dev auth cookie
- `src/app/auth/login/page.tsx` - Added dev credential validation
- `src/app/dashboard/page.tsx` - Added logout handler
- `src/components/layout/navigation.tsx` - Added auth state detection and logout

## Testing

1. Navigate to `/auth/login`
2. Enter credentials:
   - Email: `dev@example.com`
   - Password: `dev12345`
3. Click "Sign In"
4. Should redirect to `/studio`
5. Navigation should show "Studio" and "Logout" buttons
6. Clicking "Logout" clears auth and redirects to home

## Removing Temporary Auth (For Backend Integration)

When ready to integrate real authentication:

### Step 1: Remove Dev Auth Files
```bash
rm src/lib/dev-auth.ts
```

### Step 2: Update `src/lib/auth.ts`
Replace `getCurrentUser()` with real session lookup:

```typescript
// Example for NextAuth:
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user || null;
}
```

### Step 3: Update Login Page
Remove dev credential check from `src/app/auth/login/page.tsx`:
- Remove `validateDevCredentials` import and usage
- Remove dev auth info banner
- Connect to real auth API

### Step 4: Clean Up Navigation
- Remove `isDevAuthActive` and `clearDevAuth` imports
- Update auth state detection to use real session
- Update logout to use real auth provider's signOut

### Step 5: Update Logout Handlers
Replace `clearDevAuth()` calls with real auth provider logout:
```typescript
// Example for NextAuth:
import { signOut } from "next-auth/react";
await signOut();
```

## Notes

- ✅ **Isolated**: All dev auth code is clearly marked and isolated
- ✅ **Easy to Remove**: Can be removed in a few steps without affecting UI
- ✅ **No Fake DB**: No database records or schema changes required
- ✅ **UI Unchanged**: Auth UI stays the same, only logic changes
- ✅ **Route Guard Compatible**: Existing route protection logic works with real auth

## Security Warning

⚠️ **NEVER deploy this to production!** This is a development-only solution. Real authentication must be implemented before any production deployment.

