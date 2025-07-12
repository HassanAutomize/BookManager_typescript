
import React, { createContext, useState, useContext } from "react";

type Book = { id: number; title: string; body: string };

type BooksContextType = {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
};

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};
