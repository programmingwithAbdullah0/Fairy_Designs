import { toast } from "sonner";

/**
 * Show a success toast notification
 * @param message - The success message to display
 */
export const showSuccess = (message: string) => {
  toast.success(message, {
    duration: 4000,
  });
};

/**
 * Show an error toast notification
 * @param message - The error message to display
 */
export const showError = (message: string) => {
  toast.error(message, {
    duration: 5000,
  });
};

/**
 * Show an info toast notification
 * @param message - The info message to display
 */
export const showInfo = (message: string) => {
  toast.info(message, {
    duration: 4000,
  });
};

/**
 * Show a warning toast notification
 * @param message - The warning message to display
 */
export const showWarning = (message: string) => {
  toast.warning(message, {
    duration: 4000,
  });
};

/**
 * Show a loading toast notification
 * @param message - The loading message to display
 * @returns Toast ID that can be used to dismiss or update the toast
 */
export const showLoading = (message: string) => {
  return toast.loading(message);
};

/**
 * Dismiss a specific toast by ID
 * @param toastId - The ID of the toast to dismiss
 */
export const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId);
};
