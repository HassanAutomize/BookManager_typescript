import { Route, Routes, Outlet } from "react-router-dom";
import Layout from "@/components/layouts/main";  
import BooksTable from "@/components/layouts/BooksTable";
import EditForm from "@/pages/BookListe/EditForm";
import {useState} from "react";
import AddBookForm from "@/pages/BookListe/AddForm";


const AppRoutes: React.FC = () => {
  const [books , setBooks] = useState<Book[]>([]);
  
  return (
    <Routes>
      <Route
        path=""
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path="/ListBook" element={<BooksTable  books={books} setBooks={setBooks} />} />
        <Route path="/AddBook" element={<AddBookForm  books={books} setBooks={setBooks}/>} />
        <Route path="/EditBook/:id" element={<EditForm books={books} setBooks={setBooks} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
