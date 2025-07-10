import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilLine } from 'lucide-react';
import { Trash } from 'lucide-react';
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


type Book = {
  id: number;
  title: string;
  body: string;
};

const columns: ColumnDef<Book>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Description",
    accessorKey: "body",
  },
];


const BooksTable: React.FC = () => {
  const [data, setData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState(""); 
    const { toast } = useToast(); 
  
  const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=20";

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement :", error);
        setLoading(false);
      });
  }, []);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });
   
  return (
    <Card>
      <CardHeader>
        <CardTitle>Book List</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="w-full h-32" />
        ) : (
          <div>
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
  {table.getRowModel().rows.map(row => (
    <tr key={row.id} className="hover:bg-muted/50">
      <td className="px-4 py-2 text-sm border-b">{row.original.id}</td>
      <td className="px-4 py-2 text-sm border-b">{row.original.title}</td>
      <td className="px-4 py-2 text-sm border-b">{row.original.body}</td>
      <td className="px-4 py-2 text-sm border-b">
      <div className="flex items-center space-x-2">
        <button
          className="text-blue-600 hover:underline mr-2"
          onClick={() => window.location.href = `/EditBook/${row.original.id}`}
        >
          <PencilLine className="flex" />
        </button>
        <button
          className="text-red-600 hover"
         onClick={() => {
  if (window.confirm(`Voulez-vous vraiment supprimer le livre ID ${row.original.id} ?`)) {
    // Ici tu peux faire ta suppression API ou update local data
    toast({
      title: "Succès",
      description: `Livre ${row.original.id} supprimé avec succès !`,
      variant: "success",
    });
    // Optionnel : supprimer localement de la data
    setData(prev => prev.filter(book => book.id !== row.original.id));
  } else {
    toast({
      title: "Annulé",
      description: "Suppression annulée.",
      variant: "destructive",
    });
  }
}}

        >
          <Trash className="inline mr-1" />
        </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                First
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Prev
              </button>
              <span>
                Page{" "}
                <strong>
                  {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </strong>{" "}
              </span>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                Last
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


export default BooksTable;
