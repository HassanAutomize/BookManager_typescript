import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilLine, Trash } from "lucide-react";
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
import { useBooks } from "@/pages/BookListe/BooksContext";
import { useNavigate } from "react-router-dom";


type Book = {
  id: number;
  title: string;
  body: string;
};

const columns: ColumnDef<Book>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Title", accessorKey: "title" },
  { header: "Description", accessorKey: "body" },
];

const BooksTable: React.FC = () => {
  const { books, setBooks } = useBooks();  
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const { showToast } = useToast();

useEffect(() => {
  
  if (books.length === 0) {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=20")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement :", error);
      })
      .finally(() => setLoading(false));
  } else {
    console.log("Chargement évité, données modifiées présentes :", books);
    setLoading(false);
  }
}, [books, setBooks]);

const navigate = useNavigate();






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

  const handleDelete = (bookId: number) => {
    const confirmed = window.confirm(`Voulez-vous vraiment supprimer le livre ID ${bookId} ?`);
    if (confirmed) {
      showToast({
        title: "Livre supprimé",
        description: `Le livre avec l'ID ${bookId} a été supprimé.`,
        variant: "success",
      });
      setBooks((prevData) => prevData.filter((book) => book.id !== bookId));  // <-- mise à jour dans contexte
    } else {
      showToast({
        title: "Suppression annulée",
        description: "Aucune modification effectuée.",
        variant: "error",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book List</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="w-full h-32" />
        ) : (
          <>
            <input
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search books"
              className="mb-4 p-2 border rounded"
            />
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
                            onClick={() => handleDelete(row.original.id)}
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
    </Card>
  );
};

export default BooksTable;
