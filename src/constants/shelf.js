import { ALL_FILTER } from "./books";

// A rating filter keeps the books with at least this many stars.
export const RATING_OPTIONS = [5, 4, 3, 2, 1];

export const SORT_MODES = {
  reading: "reading",
  title: "title",
};

// Shown on the sort button.
export const SORT_LABELS = {
  [SORT_MODES.reading]: "Ult. lectura",
  [SORT_MODES.title]: "A – Z",
};

export const DEFAULT_SORT = SORT_MODES.reading;

/** Nothing filtered out: the state the shelf starts in. */
export const EMPTY_QUERY = {
  estatus: ALL_FILTER,
  genero: ALL_FILTER,
  calificacion: ALL_FILTER,
  search: "",
  sort: DEFAULT_SORT,
};
