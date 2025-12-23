# Clerk Authentication Setup Guide - Fairy Designs

This guide explains the complete Clerk authentication setup for the Fairy Designs admin panel.

## Overview

We've implemented a secure, custom-branded authentication system using Clerk for the admin panel. The setup includes:

- Custom login page with Fairy Designs branding
- Protected admin routes
- User authentication with username/password
- Sign-out functionality
- Responsive design with Tailwind CSS

---

## Installation & Setup

### 1. Package Installation

The `@clerk/nextjs` package has been installed:

```bash
npm install @clerk/nextjs --legacy-peer-deps
```

### 2. Environment Variables

Add your Clerk credentials to `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Optional: Customize redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/admin/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin
```

**How to get your keys:**

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application (or select existing)
3. Go to **API Keys** section
4. Copy your **Publishable Key** and **Secret Key**
5. Replace the placeholder values in `.env.local`

---

## File Structure

```
fairy-designs/
├── middleware.ts                    # Clerk middleware for route protection
├── .env.local                       # Environment variables (Clerk keys)
├── src/
│   └── app/
│       ├── layout.tsx              # Wrapped with ClerkProvider
│       └── admin/
│           ├── page.tsx            # Protected admin dashboard
│           └── login/
│               └── page.tsx        # Custom branded login page
```

---

## Implementation Details

### 1. Middleware Configuration (`middleware.ts`)

Located at project root, this file protects all `/admin` routes:

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

**What it does:**
- Automatically protects all `/admin/**` routes
- Redirects unauthenticated users to `/admin/login`
- Allows public access to homepage and product pages
- Doesn't interfere with static assets or API routes

### 2. App Layout with ClerkProvider (`src/app/layout.tsx`)

The entire app is wrapped in `<ClerkProvider>`:

```typescript
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          <ToastProvider />
          <main className="pt-20">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

### 3. Custom Login Page (`src/app/admin/login/page.tsx`)

Features:
- **Custom branding** with Fairy Designs logo and colors
- **Purple-to-pink gradient** theme
- **Fully responsive** design (mobile, tablet, desktop)
- **Form validation** with error messages
- **Clerk authentication** under the hood

**Key UI elements:**
- Fairy wings + FD logo SVG
- "FAIRY DESIGNS" gradient text
- "Admin Panel" subtitle
- Username and password inputs
- "Continue" button with gradient
- Error message display

**Authentication flow:**
```typescript
const { signIn, setActive } = useSignIn();

const result = await signIn.create({
  identifier: username,
  password: password,
});

if (result.status === 'complete') {
  await setActive({ session: result.createdSessionId });
  router.push('/admin'); // Redirect to dashboard
}
```

### 4. Protected Admin Dashboard (`src/app/admin/page.tsx`)

Features:
- **Automatic protection** via middleware
- **User info display** (Welcome message with username)
- **UserButton** component (Clerk's built-in user menu)
- **Sign Out button** with custom styling
- **Stats dashboard** with existing functionality

**Header section:**
```typescript
<div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
      Fairy Designs Admin Dashboard
    </h1>
    <p>Welcome back, {user?.firstName || user?.username || 'Admin'}</p>
  </div>
  <div className="flex items-center gap-3">
    <UserButton afterSignOutUrl="/admin/login" />
    <SignOutButton>
      <button>Sign Out</button>
    </SignOutButton>
  </div>
</div>
```

---

## Creating Test Users in Clerk

### Option 1: Clerk Dashboard (Recommended for Testing)

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **Users** section
4. Click **+ Create User**
5. Fill in the details:
   - **Username**: `anasfd` (or any username)
   - **Password**: `sajid` (or any secure password)
   - **Email**: (optional but recommended)
6. Click **Create**

### Option 2: Enable Sign-Up (For Production)

If you want users to register themselves:

1. In Clerk Dashboard, go to **User & Authentication** → **Email, Phone, Username**
2. Enable **Username** authentication
3. Configure sign-up options
4. Users can now register at the login page

---

## Usage Instructions

### Starting the Development Server

```bash
npm run dev
```

### Accessing the Admin Panel

1. **Navigate to**: `http://localhost:3000/admin`
2. **You'll be redirected to**: `http://localhost:3000/admin/login`
3. **Enter credentials**:
   - Username: `anasfd` (or your created username)
   - Password: `sajid` (or your created password)
4. **Click "Continue"**
5. **You'll be redirected to**: `http://localhost:3000/admin` (dashboard)

### Testing Protection

Try these scenarios:

- Visit `/admin` without logging in → Should redirect to `/admin/login`
- Visit homepage `/` → Should work without login
- Log in and visit `/admin` → Should show dashboard
- Click "Sign Out" → Should redirect to login page

---

## Design Features

### Color Scheme
- **Primary gradient**: Purple (#7c3aed) to Pink (#ec4899)
- **Background**: Clean white
- **Text**: Gray tones for hierarchy

### Responsive Breakpoints
- **Mobile**: Full-width card with padding
- **Tablet**: Centered card, max-width 400-450px
- **Desktop**: Same as tablet with better spacing

### Interactive Elements
- **Input focus**: Purple border with glow effect
- **Button hover**: Shadow lift effect
- **Button active**: Scale down animation
- **Loading state**: Disabled with opacity

---

## Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use test keys** for development (start with `pk_test_` and `sk_test_`)
3. **Use production keys** only in production (start with `pk_live_` and `sk_live_`)
4. **Middleware protects routes** automatically - no manual checks needed
5. **Session management** is handled by Clerk

---

## Troubleshooting

### Issue: "Invalid credentials" error

**Solution:**
- Verify you created a user in Clerk Dashboard
- Check username/password match exactly
- Ensure Clerk keys are correct in `.env.local`

### Issue: Redirect loop or infinite loading

**Solution:**
- Restart the dev server after changing `.env.local`
- Clear browser cache and cookies
- Check middleware configuration

### Issue: "Clerk API key not found"

**Solution:**
- Verify `.env.local` has both keys set
- Restart Next.js dev server (`npm run dev`)
- Check key format (no extra spaces or quotes)

### Issue: Public pages require login

**Solution:**
- Check middleware matcher configuration
- Ensure only `/admin(.*)` is protected
- Verify ClerkProvider wraps the entire app

---

## Next Steps

### Add Role-Based Access Control

```typescript
// In middleware.ts
const user = await currentUser();
const isAdmin = user?.publicMetadata?.role === 'admin';

if (isProtectedRoute(req) && !isAdmin) {
  return redirectToUrl('/unauthorized');
}
```

### Customize Clerk Components

```typescript
// In app/layout.tsx
<ClerkProvider
  appearance={{
    variables: {
      colorPrimary: '#7c3aed',
      colorBackground: '#ffffff',
    }
  }}
>
```

### Add Sign-Up Page

Create `src/app/admin/signup/page.tsx` with similar branding.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Icons**: Lucide React

---

## Support & Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## Summary

You now have a fully functional, secure, and beautifully branded admin authentication system for Fairy Designs!

The implementation includes:
✅ Custom login page with Fairy Designs branding
✅ Protected admin routes
✅ User authentication with Clerk
✅ Sign-out functionality
✅ Responsive design
✅ Error handling
✅ Production-ready code

Just add your Clerk keys and create a test user to get started!
