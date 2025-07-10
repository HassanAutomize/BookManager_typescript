// import { Toaster } from "@/components/ui/toaster";  
import AppRoutes from "./routes/routes";  
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";

const App: React.FC = () => {
  return (
    <Router>
      {/* <Toaster /> */}
       <ToastProvider>
      <AppRoutes />
          <ToastViewport />
    </ToastProvider>
    </Router>
  );
};

export default App;
