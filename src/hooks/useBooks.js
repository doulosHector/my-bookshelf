import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants/storage";
import { IMPORT_MODES } from "../constants/csv";
import { createBookId, normalizeBook } from "../utils/book";

const withId = (book) => (book.id ? book : { ...book, id: createBookId() });

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

  /**
   * Adds the books coming from a CSV. In "merge" mode a row that carries the id
   * of an existing book updates it and the rest are added on top; in "replace"
   * mode the file becomes the whole shelf.
   */
  const importBooks = useCallback(
    (incoming, mode) => {
      setBooks((current) => {
        if (mode === IMPORT_MODES.replace) return incoming.map(withId);

        const updates = new Map(incoming.filter((book) => book.id).map((book) => [book.id, book]));
        const known = new Set(current.map((book) => book.id));
        const added = incoming.filter((book) => !known.has(book.id)).map(withId);

        return [...added, ...current.map((book) => updates.get(book.id) ?? book)];
      });
    },
    [setBooks],
  );

  return { books, saveBook, deleteBook, importBooks };
}
