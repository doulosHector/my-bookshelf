import { ALL_FILTER } from "./books";

// A rating filter keeps the books with at least this many stars.
export const RATING_OPTIONS = [5, 4, 3, 2, 1];

/** Nothing filtered out: the state the shelf starts in. */
export const EMPTY_QUERY = {
  estatus: ALL_FILTER,
  genero: ALL_FILTER,
  calificacion: ALL_FILTER,
  search: "",
};
