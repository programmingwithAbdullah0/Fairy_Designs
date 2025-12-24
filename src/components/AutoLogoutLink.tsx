"use client";

import { useAuth, useClerk } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AutoLogoutLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AutoLogoutLink({ href, children, className, onClick }: AutoLogoutLinkProps) {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const pathname = usePathname();

  const handleClick = async (e: React.MouseEvent) => {
    // If user is on admin page and clicking a non-admin link, logout first
    if (isSignedIn && pathname?.startsWith('/admin') && !href.startsWith('/admin')) {
      e.preventDefault();
      await signOut();
      window.location.href = href;
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
