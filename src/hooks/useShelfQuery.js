import { useCallback, useMemo, useState } from "react";
import { EMPTY_QUERY, SORT_MODES } from "../constants/shelf";
import {
  countActiveFilters,
  countByStatus,
  filterBooks,
  shelfGenres,
  sortBooks,
} from "../utils/shelf";

/** Owns the filters, the search and the order, and derives the books on screen. */
export function useShelfQuery(books) {
  const [query, setQuery] = useState(EMPTY_QUERY);

  const update = useCallback((patch) => setQuery((current) => ({ ...current, ...patch })), []);

  const toggleSort = useCallback(
    () =>
      setQuery((current) => ({
        ...current,
        sort: current.sort === SORT_MODES.title ? SORT_MODES.reading : SORT_MODES.title,
      })),
    [],
  );

  // Clearing keeps the order the reader picked; only the filters go back.
  const reset = useCallback(
    () => setQuery((current) => ({ ...EMPTY_QUERY, sort: current.sort })),
    [],
  );

  const genres = useMemo(() => shelfGenres(books), [books]);
  // Counted on the shelf itself, not on what the other filters leave: the
  // number tells the reader what is there, whatever else is narrowed down.
  const counts = useMemo(() => countByStatus(books), [books]);
  const visible = useMemo(() => sortBooks(filterBooks(books, query), query.sort), [books, query]);

  const activeFilters = countActiveFilters(query);
  const isFiltered = activeFilters > 0 || query.search.trim() !== "";

  return {
    query,
    update,
    toggleSort,
    reset,
    genres,
    counts,
    visible,
    activeFilters,
    isFiltered,
    total: books.length,
  };
}
