import { useCallback, useState } from "react";
import { docToResult, searchOpenLibrary } from "../services/openLibrary";
import { SEARCH_ERRORS } from "../constants/openLibrary";

/** Search state for the optional Open Library lookup inside the book form. */
export function useOpenLibrarySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  /** `term` lets a caller search something other than what is in the box. */
  const search = useCallback(
    async (term = query) => {
      const text = term.trim();
      if (!text) return;
      setSearching(true);
      setError(null);
      setResults([]);
      try {
        const docs = await searchOpenLibrary(text);
        if (docs.length === 0) setError(SEARCH_ERRORS.empty);
        setResults(docs.map(docToResult));
      } catch {
        setError(SEARCH_ERRORS.blocked);
      }
      setSearching(false);
    },
    [query],
  );

  const reset = useCallback(() => {
    setQuery("");
    setResults([]);
    setError(null);
  }, []);

  return { query, setQuery, results, searching, error, search, reset };
}
