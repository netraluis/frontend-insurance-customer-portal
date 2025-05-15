// src/hooks/use-toast.ts
import { useState } from "react";
import { toast } from "sonner";

// Define un tipo para un toast.
interface Toast {
  id: string;
  message: string;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Función para agregar un toast.
  const addToast = (message: string) => {
    const newToast = { id: Date.now().toString(), message };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Elimina el toast después de 5 segundos (opcional).
    setTimeout(() => {
      removeToast(newToast.id);
    }, 5000);
  };

  // Función para eliminar un toast por id.
  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return {
    toast,
    addToast,
    removeToast,
  };
};
