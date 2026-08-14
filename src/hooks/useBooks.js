import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants/storage";
import { createBookId, normalizeBook } from "../utils/book";

/** Owns the book collection and its persistence. */
export function useBooks() {
  const [books, setBooks] = useLocalStorage(STORAGE_KEYS.books, []);

  /** Creates or updates a book depending on whether the form carries an id. */
  const saveBook = useCallback(
    (form) => {
      const book = normalizeBook(form);
      setBooks((current) =>
        book.id
          ? current.map((b) => (b.id === book.id ? book : b))
          : [{ ...book, id: createBookId(), agregado: new Date().toISOString() }, ...current],
      );
    },
    [setBooks],
  );

  const deleteBook = useCallback(
    (id) => setBooks((current) => current.filter((b) => b.id !== id)),
    [setBooks],
  );

  return { books, saveBook, deleteBook };
}
