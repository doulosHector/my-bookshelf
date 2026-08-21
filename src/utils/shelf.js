import { ALL_FILTER } from "../constants/books";
import { SORT_MODES } from "../constants/shelf";

/** Lowercase and without diacritics, so "Bronte" also matches "Brontë". */
function fold(text) {
  return String(text ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/gu, "");
}

/** Genres actually present on the shelf, alphabetically; fills the genre select. */
export function shelfGenres(books) {
  const genres = new Set(books.map((book) => book.genero).filter(Boolean));
  return [...genres].sort((a, b) => a.localeCompare(b, "es"));
}

/**
 * Keeps the books matching every active filter.
 * @param {object[]} books
 * @param {object} query see EMPTY_QUERY
 */
export function filterBooks(books, query) {
  const minRating = query.calificacion === ALL_FILTER ? 0 : Number(query.calificacion);
  const needle = fold(query.search.trim());

  return books.filter((book) => {
    if (query.estatus !== ALL_FILTER && book.estatus !== query.estatus) return false;
    if (query.genero !== ALL_FILTER && book.genero !== query.genero) return false;
    if ((book.calificacion || 0) < minRating) return false;
    if (!needle) return true;
    return fold(book.titulo).includes(needle) || fold(book.autor).includes(needle);
  });
}

/**
 * Alphabetically by title, or the most recent reading first. The sort is
 * stable, so books with no reading date keep their order at the end.
 * @param {object[]} books
 * @param {string} sort see SORT_MODES
 */
export function sortBooks(books, sort) {
  const sorted = [...books];

  if (sort === SORT_MODES.title) {
    sorted.sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));
  } else {
    sorted.sort((a, b) => (b.fechaFin || "").localeCompare(a.fechaFin || ""));
  }

  return sorted;
}
