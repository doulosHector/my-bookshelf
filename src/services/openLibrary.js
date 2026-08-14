import {
  OPEN_LIBRARY_SEARCH_URL,
  SEARCH_FIELDS,
  SEARCH_RESULT_LIMIT,
} from "../constants/openLibrary";

/**
 * Searches Open Library and returns at most SEARCH_RESULT_LIMIT documents.
 * Throws when the network request fails, so the caller can show a fallback.
 * @param {string} query
 * @param {AbortSignal} [signal]
 */
export async function searchOpenLibrary(query, signal) {
  const params = new URLSearchParams({
    q: query,
    limit: String(SEARCH_RESULT_LIMIT),
    fields: SEARCH_FIELDS.join(","),
  });

  const response = await fetch(`${OPEN_LIBRARY_SEARCH_URL}?${params}`, { signal });
  if (!response.ok) throw new Error(`Open Library respondió ${response.status}`);

  const data = await response.json();
  return (data.docs || []).slice(0, SEARCH_RESULT_LIMIT);
}

/** Maps an Open Library document onto the book form fields. */
export function docToBookFields(doc) {
  return {
    titulo: doc.title || "",
    autor: (doc.author_name && doc.author_name[0]) || "",
    anio: doc.first_publish_year ? String(doc.first_publish_year) : "",
    genero: (doc.subject && doc.subject[0]) || "",
  };
}
