import { writable } from "svelte/store";
import Toast from "$lib/Toast";
import type { ToastType } from "$lib/ToastType";



export const toasts = writable<Toast[]>([]);

export const addToast = (message: string, type: ToastType, details = "", dismissible = true, timeout = 3000) => {
  const id = Math.floor(Math.random() * 10000);

  const toast = new Toast(
    id, message, type, details, dismissible, timeout
  );

  toasts.update((all) => [toast, ...all]);

  if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id: number) => {
  toasts.update((all) => all.filter((toast) => toast.id !== id));
};
