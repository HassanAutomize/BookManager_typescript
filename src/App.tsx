
import { ToastProviderWrapper } from "./hooks/use-toast";
import { BooksProvider } from "./pages/BookListe/BooksContext";
import AppRoutes from "./routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
   <BooksProvider>
    <QueryClientProvider client={queryClient}>
      <ToastProviderWrapper>
      <Router>
        <AppRoutes />
      </Router>
    </ToastProviderWrapper>
    </QueryClientProvider>
    </BooksProvider>

  );
};

export default App;
