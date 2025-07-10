// import { Toaster } from "@/components/ui/toaster";  
import AppRoutes from "./routes/routes";  
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      {/* <Toaster /> */}
      <AppRoutes />
    </Router>
  );
};

export default App;
