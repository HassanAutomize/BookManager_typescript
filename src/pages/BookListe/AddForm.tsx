import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBooks } from "@/pages/BookListe/BooksContext";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const bookSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
});

type BookFormData = z.infer<typeof bookSchema>;

const AddBookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  const { setBooks } = useBooks();
  const [open, setOpen] = useState(true); 

  const onSubmit = async (data: BookFormData) => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: data.title,
        body: data.description,
      });

      const newBook = {
        id: response.data.id || Math.floor(Math.random() * 100000),
        title: data.title,
        body: data.description,
      };

      setBooks((prevBooks) => [...prevBooks, newBook]);

      toast.success("Livre ajouté avec succès ✅");
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Erreur d'ajout :", error);
      toast.error("Erreur lors de l'ajout du livre ❌");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium">
              Titre
            </label>
            <input
              id="title"
              {...register("title")}
              className="w-full border px-3 py-2 rounded"
              placeholder="Titre du livre"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <input
              id="description"
              {...register("description")}
              className="w-full border px-3 py-2 rounded"
              placeholder="Description du livre"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Annuler
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-green-600 text-white">
              Ajouter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookForm;
