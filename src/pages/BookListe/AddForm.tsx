// import React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner"; 
// import { Toast, ToastProvider } from "@/components/ui/toast"; 


// const bookSchema = z.object({
//   title: z.string().min(1, "Le titre est requis"),
//   description: z.string().min(1, "La description est requise"),
// });


// type BookFormData = z.infer<typeof bookSchema>;

// const AddBookForm: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<BookFormData>({
//     resolver: zodResolver(bookSchema),
//   });


//   const onSubmit = (data: BookFormData) => {
//     console.log("Livre ajouté:", data);


//     toast.success("Livre ajouté avec succès !");

//     reset();
//   };

//   return (
//   <div>
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
//       <div>
//         <label htmlFor="title" className="block font-medium">
//           Titre
//         </label>
//         <input
//           type="text"
//           id="title"
//           {...register("title")}
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Titre du livre"
//         />
//         {errors.title && (
//           <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
//         )}
//       </div>

//       <div>
//         <label htmlFor="description" className="block font-medium">
//           Description
//         </label>
//         <input
//           type="text"
//           id="description"
//           {...register("description")}
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Description du livre"
//         />
//         {errors.description && (
//           <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="px-4 py-2 bg-green-600 text-white rounded"
//       >
//         Ajouter
//       </button>
//     </form>
//      <Toast />
//       <ToastProvider/>
//     </div>
//     );
// };

// export default AddBookForm;
import { toast } from "sonner"; 
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react"; 


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

  const [isFormSubmitted, setIsFormSubmitted] = useState(false); 

  const onSubmit = (data: BookFormData) => {
    console.log("Livre ajouté:", data);

   
    toast.success("Livre ajouté avec succès !");


    reset();

  
    setIsFormSubmitted(true);
  };

  return (
    <div>
      {isFormSubmitted ? (
      
        <div className="text-green-600 font-semibold">
          Livre ajouté avec succès !
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div>
            <label htmlFor="title" className="block font-medium">
              Titre
            </label>
            <input
              type="text"
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
              type="text"
              id="description"
              {...register("description")}
              className="w-full border px-3 py-2 rounded"
              placeholder="Description du livre"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Ajouter
          </button>
        </form>
      )}
    </div>
  );
};

export default AddBookForm;
