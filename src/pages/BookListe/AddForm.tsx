import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {Dialog,DialogFooter,DialogContent, DialogHeader} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

const bookSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
});

type BookFormData = z.infer<typeof bookSchema>;

type AddBookFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
};


const AddBookForm: React.FC<AddBookFormProps> = ({ open, setOpen, setBooks }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  const { showToast } = useToast();
  const onSubmit = async (data: BookFormData) => {
  try {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
      title: data.title,
      body: data.description,
    });

    console.log("la reponse de l'api :", response.data);

    const newBook = {
      id: response.data.id || Math.floor(Math.random() * 100000),
      title: data.title,
      body: data.description,
    };

setBooks((prevBooks) => {
  const updatedBooks = [...prevBooks, newBook];
  console.log("Livres après ajout :", updatedBooks); 
  return updatedBooks;
});

  showToast({
  title: "Livre ajouté avec succès !",
  description: "Le livre a été enregistré correctement.",
  variant: "success",
});
    reset();
    setOpen(false);
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
    showToast({
      title: "Erreur lors de l'ajout du livre",
      description: "Une erreur s'est produite lors de l'ajout du livre.",
      variant: "error",
    });
  }
};


  return (
    <Dialog open={open} onOpenChange={setOpen}>
     
      <DialogContent>
         <DialogTitle>Ajouter un livre</DialogTitle>
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
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)} 
            >
              Annuler
            </Button>
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
