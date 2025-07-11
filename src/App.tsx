
import { ToastProviderWrapper } from "./hooks/use-toast";
import AppRoutes from "./routes/routes";
import { BrowserRouter as Router } from "react-router-dom";


const App: React.FC = () => {
  return (
  
      <ToastProviderWrapper>
      <Router>
        <AppRoutes />
      </Router>
    </ToastProviderWrapper>

  );
};

export default App;
