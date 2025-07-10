import { useToast } from "@/hooks/use-toast";  
import { Toast, ToastProvider, ToastTitle, ToastDescription, ToastClose, ToastViewport } from "@/components/ui/toast"; 

export function Toaster() {
  const { toasts } = useToast();  

  return (
    <ToastProvider>
      
      {Array.isArray(toasts) && toasts.length > 0 ? (
        toasts.map((toastItem) => (
          <Toast key={toastItem.id} {...toastItem.props}>
            <div className="grid gap-1">
             
              {toastItem.title && <ToastTitle>{toastItem.title}</ToastTitle>} 
              
              {toastItem.description && (
                <ToastDescription>{toastItem.description}</ToastDescription>
              )}
            </div>
           
            <ToastClose />
          </Toast>
        ))
      ) : (
        <div>No toasts available</div> 
      )}
      
      <ToastViewport />
    </ToastProvider>
  );
}
