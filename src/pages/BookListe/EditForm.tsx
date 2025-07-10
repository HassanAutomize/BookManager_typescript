import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const schema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  body: z.string().min(5, "La description doit contenir au moins 5 caractères"),
});

type FormData = z.infer<typeof schema>;

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const onSubmit = async (data: FormData) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data);
      alert("Livre mis à jour avec succès !");
      navigate("/ListBook");
    } catch {
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 600, margin: "2rem auto", padding: 20, backgroundColor: "#f9f9f9", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 20 }}>Modifier Livre</h2>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="title" style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>Titre</label>
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
        <label htmlFor="body" style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>Description</label>
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
  );
};

export default EditForm;
