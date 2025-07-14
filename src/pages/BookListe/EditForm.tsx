import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useBooks } from "./BooksContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


const schema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  body: z.string().min(5, "La description doit contenir au moins 5 caractères"),
});

type FormData = z.infer<typeof schema>;

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setBooks } = useBooks();
  const [openModal, setOpenModal] = useState(false);
  const [pendingData, setPendingData] = useState<FormData | null>(null);
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

 
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => {
      setValue("title", res.data.title);
      setValue("body", res.data.body);
    });
  }, [id, setValue]);
  const handleFormSubmit = (data: FormData) => {
    setPendingData(data);
    setOpenModal(true); 
  };

  const confirmUpdate = async () => {
    if (!pendingData) return;

    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, pendingData);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === Number(id) ? { ...book, ...pendingData } : book
        )
      );
      setOpenModal(false);
      showToast({
        title: "Livre mis à jour avec succès !",
        description: "Le livre a été enregistré correctement.",
        variant: "success",
      });
      navigate("/ListBook");
    } catch {
      showToast({
        title: "Erreur lors de la mise à jour",
        description: "Une erreur s'est produite lors de la mise à jour du livre.",
        variant: "error",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        style={{
          maxWidth: 600,
          margin: "2rem auto",
          padding: 20,
          backgroundColor: "#f9f9f9",
          borderRadius: 8,
        }}
      >
        <h1 style={{ marginBottom: 20, fontSize: "24px", fontWeight: "bold" }}>Modifier Livre</h1>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="title" style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>
            Titre
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: 4,
              border: errors.title ? "1px solid red" : "1px solid #ccc",
              fontSize: 16,
            }}
          />
          {errors.title && <p style={{ color: "red", marginTop: 4 }}>{errors.title.message}</p>}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="body" style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>
            Description
          </label>
          <textarea
            id="body"
            rows={5}
            {...register("body")}
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: 4,
              border: errors.body ? "1px solid red" : "1px solid #ccc",
              fontSize: 16,
            }}
          />
          {errors.body && <p style={{ color: "red", marginTop: 4 }}>{errors.body.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            border: "none",
            borderRadius: 4,
            color: "white",
            fontWeight: "bold",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "En cours..." : "Mettre à jour"}
        </button>
      </form>
    
    
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la mise à jour</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir enregistrer les modifications ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenModal(false)}>
              Annuler
            </Button>
            <Button variant="default" onClick={confirmUpdate}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditForm;
