import {
  COVER_SIZE,
  OPEN_LIBRARY_COVER_URL,
  OPEN_LIBRARY_SEARCH_URL,
  SEARCH_FIELDS,
  SEARCH_RESULT_LIMIT,
  SPANISH_FILTER,
} from "../constants/openLibrary";

/** Runs one query against Open Library and returns its documents. */
async function fetchDocs(query, signal) {
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

/**
 * Searches Open Library, preferring books that have a Spanish edition. The
 * filter excludes rather than reorders, so a book published only in another
 * language needs a second, unfiltered try to show up at all.
 * Throws when the network request fails, so the caller can show a fallback.
 * @param {string} query
 * @param {AbortSignal} [signal]
 */
export async function searchOpenLibrary(query, signal) {
  const spanish = await fetchDocs(`${query} ${SPANISH_FILTER}`, signal);
  return spanish.length > 0 ? spanish : fetchDocs(query, signal);
}

/** `default=false` answers 404 instead of a blank placeholder image. */
export function coverUrl(coverId) {
  return `${OPEN_LIBRARY_COVER_URL}/${coverId}-${COVER_SIZE}.jpg?default=false`;
}

/**
 * The Spanish edition among the ones the search returned. The unfiltered second
 * try brings back editions in any language, so the language is checked here too.
 */
function spanishEdition(doc) {
  const editions = doc.editions?.docs ?? [];
  return editions.find((edition) => edition.language?.includes("spa")) ?? null;
}

/** An edition's `publish_date` is free text: "2009", "Nov 03, 2013", "29-03-2016". */
function yearIn(publishDate) {
  const match = /\d{4}/.exec(publishDate ?? "");
  return match ? match[0] : "";
}

/**
 * Flattens a search document into what the result list shows and the form
 * needs. A work keeps its original title (usually English), so the Spanish
 * edition is what we read the title, year and cover from when there is one.
 */
export function docToResult(doc) {
  const edition = spanishEdition(doc);
  const coverId = edition?.cover_i ?? doc.cover_i ?? null;

  return {
    key: doc.key,
    spanish: Boolean(edition),
    // Stored as the bare id: shorter than a URL, and the size stays our choice.
    portada: coverId ? String(coverId) : "",
    titulo: edition?.title || doc.title || "",
    autor: (doc.author_name && doc.author_name[0]) || "",
    anio:
      yearIn(edition?.publish_date?.[0]) ||
      (doc.first_publish_year ? String(doc.first_publish_year) : ""),
    genero: (doc.subject && doc.subject[0]) || "",
  };
}

/** The subset of a result that the book form can be filled with. */
export function resultToBookFields({ titulo, autor, anio, genero, portada }) {
  return { titulo, autor, anio, genero, portada };
}
