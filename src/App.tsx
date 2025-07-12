
import { ToastProviderWrapper } from "./hooks/use-toast";
import { BooksProvider } from "./pages/BookListe/BooksContext";
import AppRoutes from "./routes/routes";
import { BrowserRouter as Router } from "react-router-dom";


const App: React.FC = () => {
  return (
   <BooksProvider>
      <ToastProviderWrapper>
      <Router>
        <AppRoutes />
      </Router>
    </ToastProviderWrapper>
    </BooksProvider>

  );
};

export default App;
