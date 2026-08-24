export const OPEN_LIBRARY_SEARCH_URL = "https://openlibrary.org/search.json";

/** Covers are addressed by the numeric id that the search returns in `cover_i`. */
export const OPEN_LIBRARY_COVER_URL = "https://covers.openlibrary.org/b/id";

/** S, M or L. M is the right weight for a thumbnail in the result list. */
export const COVER_SIZE = "M";

export const SEARCH_RESULT_LIMIT = 5;

/**
 * Solr filter that keeps only works with a Spanish edition. It goes inside `q`;
 * as a parameter of its own it is silently ignored.
 */
export const SPANISH_FILTER = "language:spa";

/**
 * `key` looks redundant next to the fields we actually read, but it is not:
 * without it the nested `editions` sub-query comes back empty.
 */
export const SEARCH_FIELDS = [
  "key",
  "title",
  "author_name",
  "first_publish_year",
  "subject",
  "cover_i",
  "editions",
  "editions.title",
  "editions.language",
  "editions.publish_date",
  "editions.cover_i",
];

export const SEARCH_ERRORS = {
  empty: "empty",
  blocked: "blocked",
};
