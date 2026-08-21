import { useCallback, useMemo, useState } from "react";
import { EMPTY_QUERY } from "../constants/shelf";
import { filterBooks, shelfGenres } from "../utils/shelf";

/** Owns the shelf filters and derives the books that end up on screen. */
export function useShelfQuery(books) {
  const [query, setQuery] = useState(EMPTY_QUERY);

  const update = useCallback((patch) => setQuery((current) => ({ ...current, ...patch })), []);

  const genres = useMemo(() => shelfGenres(books), [books]);
  const visible = useMemo(() => filterBooks(books, query), [books, query]);

  return { query, update, genres, visible, total: books.length };
}
