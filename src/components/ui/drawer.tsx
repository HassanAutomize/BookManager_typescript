

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  position?: "right" | "bottom"; 
}

export function Drawer({
  open,
  onOpenChange,
  title,
  children,
  position = "right", 
}: DrawerProps) {
  if (!open) return null;

  return (
    <>
     
      <div
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 bg-black/50 z-40"
      />

    
      <div
        className={`fixed z-50 bg-white shadow-lg rounded-t-lg ${position === "right" ? "top-0 right-0 h-full w-96 rounded-l-lg" : ""} ${position === "bottom" ? "bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-lg rounded-t-lg" : ""} transition-transform duration-300`}>
        <div className="p-4 border-b font-bold">{title}</div>
        <div className="p-4">{children}</div>
      </div>
    </>
  );
}
