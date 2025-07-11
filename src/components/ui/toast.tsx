import React, { useState, useCallback } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";



export const ToastProvider = ToastPrimitives.Provider;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={`fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] ${className}`}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Root ref={ref} className={`bg-gray-800 text-white ${className}`} {...props} />
));
Toast.displayName = ToastPrimitives.Root.displayName;

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>((props, ref) => (
  <ToastPrimitives.Close ref={ref} {...props}>
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={`text-sm font-semibold ${className}`} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={`text-sm opacity-90 ${className}`} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;




type ToastType = "success" | "error" | "default";

interface ToastMessage {
  title: string;
  description?: string;
  variant?: ToastType;
}

export function useToast() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<ToastMessage>({
    title: "",
    description: "",
    variant: "default",
  });

  const toast = useCallback((toastMessage: ToastMessage) => {
    setMessage(toastMessage);
    setOpen(true);
  }, []);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const ToastComponent = (
    <ToastProvider>
      <Toast open={open} onOpenChange={onOpenChange} className={`toast-${message.variant}`}>
        <ToastTitle>{message.title}</ToastTitle>
        {message.description && <ToastDescription>{message.description}</ToastDescription>}
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );

  return { toast, ToastComponent };
}
