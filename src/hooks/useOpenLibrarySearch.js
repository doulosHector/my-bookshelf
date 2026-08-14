import { useCallback, useState } from "react";
import { searchOpenLibrary } from "../services/openLibrary";
import { SEARCH_ERRORS } from "../constants/openLibrary";

/** Search state for the optional Open Library lookup inside the book form. */
export function useOpenLibrarySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async () => {
    if (!query.trim()) return;
    setSearching(true);
    setError(null);
    setResults([]);
    try {
      const docs = await searchOpenLibrary(query);
      if (docs.length === 0) setError(SEARCH_ERRORS.empty);
      setResults(docs);
    } catch {
      setError(SEARCH_ERRORS.blocked);
    }
    setSearching(false);
  }, [query]);

  const reset = useCallback(() => {
    setQuery("");
    setResults([]);
    setError(null);
  }, []);

  return { query, setQuery, results, searching, error, search, reset };
}
