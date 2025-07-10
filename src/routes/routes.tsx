import { Route, Routes, Outlet } from "react-router-dom";
import Layout from "@/components/layouts/main";  
import BooksTable from "@/components/layouts/BooksTable";
import EditForm from "@/pages/BookListe/EditForm";

import AddForm from "@/pages/BookListe/AddForm";


const AppRoutes: React.FC = () => {
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
        <Route path="/ListBook" element={<BooksTable />} />
        <Route path="/AddBook" element={<AddForm />} />
        <Route path="/EditBook/:id" element={<EditForm />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
