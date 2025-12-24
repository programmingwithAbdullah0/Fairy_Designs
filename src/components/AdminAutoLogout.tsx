"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';

export function AdminAutoLogout() {
  const pathname = usePathname();
  const { signOut } = useClerk();

  useEffect(() => {
    // Check if user navigates away from admin routes
    if (pathname && !pathname.startsWith('/admin')) {
      // Automatically sign out when leaving admin area
      signOut({ redirectUrl: '/' });
    }
  }, [pathname, signOut]);

  return null; // This component doesn't render anything
}
