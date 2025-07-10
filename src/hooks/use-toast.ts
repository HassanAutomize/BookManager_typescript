import { toast } from "sonner";  
export function useToast() {
  return {
  
    toasts: Array.isArray(toast.store) ? toast.store : [],  
  };
}
