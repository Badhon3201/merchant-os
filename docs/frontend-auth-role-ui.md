# MerchantOS Frontend Auth & Role UI Documentation

This document explains the frontend files added or updated for authentication, registration, dashboard access, logout, and role/permission management.

## 1. Global styling and layout

### `apps/web/src/app/globals.css`
- This is the global CSS entrypoint for the Next.js app.
- It imports Tailwind via `@import "tailwindcss"` and defines base styles for `body`, `html`, and form elements.
- Without this file, Tailwind utility classes would not work.

### `apps/web/src/app/layout.tsx`
- This is the root layout for the Next.js app.
- It imports `./globals.css` so global and Tailwind styles are available everywhere.
- It wraps the UI in `AppProvider`, which includes provider setup like React Query.
- It adds base classes to `<body>` for background color, font, and antialiasing.

## 2. Shared UI components

### `apps/web/src/component/ui/button.tsx`
- A reusable button component.
- Supports two variants: `default` and `outline`.
- Applies rounded corners, padding, hover states, focus states, and disabled state styles.
- Used by login/register forms and dashboard buttons.

### `apps/web/src/component/ui/input.tsx`
- A reusable input component with a label.
- Applies consistent border, padding, focus, and text styles.
- Used by both login and register forms.

### `apps/web/src/component/auth/auth-shell.tsx`
- A shared shell for auth pages.
- Provides a polished two-column layout with a promotional panel and a form panel.
- Used by both `/login` and `/register` pages.
- Helps keep auth pages visually consistent and easier to maintain.

## 3. Auth validation and form models

### `apps/web/src/validation/auth.schema.ts`
- Defines form validation using Zod.
- `loginSchema` validates email and password for login.
- `registerSchema` validates name, email, and password for registration.
- Exports TypeScript types `LoginFormData` and `RegisterFormData` used in the form components.

## 4. Auth API and hooks

### `apps/web/src/services/auth.service.ts`
- Defines the frontend `login` request.
- Sends POST requests to `/auth/login` using the shared Axios instance.
- Includes `companyId` along with email and password, matching the backend contract.

### `apps/web/src/services/auth/register.api.ts`
- Defines the frontend `register` request.
- Sends POST requests to `/auth/register` with `name`, `email`, `password`, and `companyId`.

### `apps/web/src/hooks/use-login.ts`
- Creates a React Query mutation for login.
- It uses the `login` request function from `auth.service.ts`.

### `apps/web/src/hooks/use-register.ts`
- Creates a React Query mutation for registration.
- It uses the `register` request function from `register.api.ts`.

### `apps/web/src/hooks/use-logout.ts`
- Creates a React Query mutation for logout.
- Sends POST requests to `/auth/logout`.
- Clears local auth state and redirects the user to `/login`.

## 5. Page implementations

### `apps/web/src/app/(auth)/login/page.tsx`
- Renders the login page.
- Uses `AuthShell` for layout.
- Uses `react-hook-form` with `zodResolver` for validation.
- Calls `useLogin()` to send login requests.
- Stores the authenticated user in `useAuthStore` on success.
- Redirects to `/dashboard` after successful login.

### `apps/web/src/app/(auth)/register/page.tsx`
- Renders the registration page.
- Uses `AuthShell` for layout.
- Uses `react-hook-form` + `zodResolver` for validation.
- Calls `useRegister()` to create a new user.
- Stores the new user in `useAuthStore` and redirects to `/dashboard`.

### `apps/web/src/app/dashboard/page.tsx`
- Renders the dashboard landing page.
- Includes a logout button using `useLogout()`.
- Includes a link to `/dashboard/roles`.
- Uses modern card and gradient styling for a polished admin experience.

## 6. Role and permission management

### `apps/web/src/services/roles/role.api.ts`
- Defines API calls for role management:
  - `getRoles()` to fetch available roles.
  - `createRole(name)` to create a new role.
  - `updateRole({id, name})` to rename a role.
  - `deleteRole(id)` to delete a role.
  - `getPermissions()` to fetch permission definitions.
  - `assignPermissions({id, permissionIds})` to assign permissions to a role.

### `apps/web/src/hooks/use-roles.ts`
- Provides React Query hooks for role pages:
  - `useRoles()` for fetching roles.
  - `usePermissions()` for fetching permissions.
  - `useCreateRole()`, `useUpdateRole()`, `useDeleteRole()`, and `useAssignPermissions()` for mutations.
- These hooks automatically refresh the roles list after updates.

### `apps/web/src/app/dashboard/roles/page.tsx`
- Renders the role and permission management page.
- Lets the user:
  - view roles,
  - create a role,
  - select a role,
  - toggle permissions,
  - save permissions for the selected role.
- It reads data from the role hooks and calls the API hooks for actions.

## 7. Auth state handling

### `apps/web/src/store/auth.store.ts`
- Uses Zustand for simple auth state.
- Stores the currently authenticated `user`.
- Provides `setUser(user)` and `logout()`.
- `logout()` is called by `useLogout()` to clear local state.

## 8. How the flow works together

1. User opens `/login` or `/register`.
2. The page uses `AuthShell`, `Input`, and `Button` components.
3. Form validation runs via Zod schemas.
4. On submit, React Query mutations send requests to the backend.
5. On success, the user is stored in `useAuthStore`.
6. The user is redirected to `/dashboard`.
7. On `/dashboard`, the logout button calls `/auth/logout`, clears state, and returns to `/login`.
8. `/dashboard/roles` uses role APIs to manage roles and permissions.

## 9. Recommended next steps for learning
- Open `apps/web/src/app/(auth)/login/page.tsx` to see how form state and mutation callbacks work.
- Read `apps/web/src/validation/auth.schema.ts` to learn how Zod validates fields.
- Inspect `apps/web/src/hooks/use-login.ts` and `apps/web/src/hooks/use-register.ts` for React Query patterns.
- Review `apps/web/src/component/ui/button.tsx` and `apps/web/src/component/ui/input.tsx` for reusable styling.
- Check `apps/web/src/app/layout.tsx` and `apps/web/src/app/globals.css` to understand global app styling.
