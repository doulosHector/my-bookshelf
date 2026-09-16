import { ALL_FILTER, STATUSES } from "../constants/books";
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
 * How many books sit under each status, plus the whole shelf under ALL_FILTER.
 * Every status is a key even at zero, so the tabs never read `undefined`.
 */
export function countByStatus(books) {
  const counts = Object.fromEntries(STATUSES.map((status) => [status, 0]));
  counts[ALL_FILTER] = books.length;

  for (const book of books) {
    if (book.estatus in counts) counts[book.estatus] += 1;
  }

  return counts;
}

/** How many of the selects are narrowing the shelf; shown on the toggle. */
export function countActiveFilters(query) {
  return [query.estatus, query.genero, query.calificacion].filter(
    (value) => value !== ALL_FILTER,
  ).length;
}

/**
 * Keeps the books matching every active filter. The rating has to match
 * exactly: "3 estrellas" leaves out the books rated 4 and 5.
 * @param {object[]} books
 * @param {object} query see EMPTY_QUERY
 */
export function filterBooks(books, query) {
  const needle = fold(query.search.trim());

  return books.filter((book) => {
    if (query.estatus !== ALL_FILTER && book.estatus !== query.estatus) return false;
    if (query.genero !== ALL_FILTER && book.genero !== query.genero) return false;
    if (
      query.calificacion !== ALL_FILTER &&
      (book.calificacion || 0) !== Number(query.calificacion)
    ) {
      return false;
    }
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
