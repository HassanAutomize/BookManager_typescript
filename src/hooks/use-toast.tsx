import {
  Provider as ToastProvider,
  Root as ToastRoot,
  Title as ToastTitle,
  Description as ToastDescription,
  Close as ToastClose,
  Viewport as ToastViewport,
} from "@radix-ui/react-toast";
import { X } from "lucide-react";
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ToastType = "success" | "error" | "default";

interface ToastMessage {
  title: string;
  description?: string;
  variant?: ToastType;
}

interface ToastContextType {
  showToast: (message: ToastMessage) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProviderWrapper");
  }
  return context;
};

export const ToastProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<ToastMessage>({
    title: "",
    description: "",
    variant: "default",
  });

  const showToast = useCallback((msg: ToastMessage) => {
    setMessage(msg);
    setOpen(true);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastProvider>
        {children}
        <ToastRoot open={open} onOpenChange={setOpen} className={`bg-gray-600 text-white rounded shadow p-4 toast-${message.variant}`}>
          <div className="flex justify-between items-start gap-2">
            <div>
              <ToastTitle className="font-semibold">{message.title}</ToastTitle>
              {message.description && (
                <ToastDescription className="text-sm opacity-80">{message.description}</ToastDescription>
              )}
            </div>
            <ToastClose>
              <X className="h-4 w-4" />
            </ToastClose>
          </div>
        </ToastRoot>
        <ToastViewport className="fixed bottom-4 right-4 w-[320px] max-w-full" />
      </ToastProvider>
    </ToastContext.Provider>
  );
};
