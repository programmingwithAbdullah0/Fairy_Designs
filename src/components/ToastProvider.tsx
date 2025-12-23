"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      expand={true}
      richColors
      closeButton
      duration={4000}
      toastOptions={{
        style: {
          padding: '16px',
          gap: '8px',
          borderRadius: '12px',
          fontSize: '15px',
          fontWeight: '500',
        },
        className: 'toast-notification',
      }}
    />
  );
}
