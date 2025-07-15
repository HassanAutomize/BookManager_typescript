import React, {  useState } from "react";
import axios from "axios";
import { PencilLine, Trash } from "lucide-react";
import SearchInput from "./SearchInput";
import { useQuery , useMutation } from "react-query";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { useToast } from "@/hooks/use-toast"; 
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import Modal from "./ModalDelete";

type Book = {
  id: number;
  title: string;
  body: string;
};

  const columns: ColumnDef<Book>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Title", accessorKey: "title" },
  { header: "Description", accessorKey: "body" },];

  const BooksTable: React.FC = ({books , setBooks}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [openModal, setOpenModal] = useState(false);
  const { showToast } = useToast();
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  
  const navigate = useNavigate();
  const {
    data: booksdata = [],
    isLoading,

  } = useQuery({
    queryKey: ['books'],
    queryFn: () =>
       axios.get('https://jsonplaceholder.typicode.com/posts?_limit=20')
      .then((res) => res.data),
  onSuccess: (data) => {
    setBooks(data); 
  },
    staleTime: 1000 * 60 * 5, 
  });
 
   



  const deleteBookMutation = useMutation({
    mutationFn: (id : number) => 
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`),
    onSuccess: (_,id) => {
       setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    },

  })

   const handleDelete = (id : number) => {
    deleteBookMutation.mutate(id);
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    
      showToast({
        title : "Livre supprime",
        description: "Le livre a été supprimé avec succès",
        variant: "success",
      })
    

  };

  const table = useReactTable({
    data: books,
    columns,
    state: { globalFilter, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  const handleConfirmDelete = () => {
    if (selectedBookId !== null) {
      handleDelete(selectedBookId);
      setOpenModal(false);
      setSelectedBookId(null);
    }
  };

  return (
    <Card>
      <CardHeader>
      <CardTitle>Book List</CardTitle>
      </CardHeader>
      <CardContent>
      {isLoading ? (
        <Skeleton className="w-full h-32" />
      ) : (
        <>
        <SearchInput globalFilter ={globalFilter} setGlobalFilter={setGlobalFilter} />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
          <thead className="bg-muted">
            <tr>
            <th className="px-4 py-2 border-b text-sm font-medium">ID</th>
            <th className="px-4 py-2 border-b text-sm font-medium">Title</th>
            <th className="px-4 py-2 border-b text-sm font-medium">Description</th>
            <th className="px-4 py-2 border-b text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-muted/50">
              <td className="px-4 py-2 text-sm border-b">{row.original.id}</td>
              <td className="px-4 py-2 text-sm border-b">{row.original.title}</td>
              <td className="px-4 py-2 text-sm border-b">{row.original.body}</td>
              <td className="px-4 py-2 text-sm border-b">
              <div className="flex items-center space-x-2">
                <button onClick={() => navigate(`/EditBook/${row.original.id}`)}>
                <PencilLine />
                </button>
                <button
                className="text-red-600"
                onClick={() => {
                  setSelectedBookId(row.original.id);
                  setOpenModal(true);
                }}
                >
                <Trash />
                </button>
              </div>
              </td>
            </tr>
            ))}
          </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          First
          </button>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Prev
          </button>
          <span>
          Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
          {table.getPageCount()}
          </span>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
          </button>
          <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          >
          Last
          </button>
        </div>
        </>
      )}
      </CardContent>
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleConfirmDelete={handleConfirmDelete}
        setSelectedBookId={setSelectedBookId}/>
      
    </Card>
  );
};

export default BooksTable;
