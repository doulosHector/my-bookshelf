import { useCallback, useMemo, useState } from "react";
import { EMPTY_QUERY, SORT_MODES } from "../constants/shelf";
import { countActiveFilters, filterBooks, shelfGenres, sortBooks } from "../utils/shelf";

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

  const genres = useMemo(() => shelfGenres(books), [books]);
  const visible = useMemo(() => sortBooks(filterBooks(books, query), query.sort), [books, query]);

  return {
    query,
    update,
    toggleSort,
    genres,
    visible,
    activeFilters: countActiveFilters(query),
    total: books.length,
  };
}
