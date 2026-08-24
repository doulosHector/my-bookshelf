/**
 * Trims the free-text fields and coerces the numeric ones before saving.
 * @param {object} form
 * @returns {object} book ready to be stored
 */
export function normalizeBook(form) {
  const book = {
    ...form,
    titulo: form.titulo.trim(),
    autor: form.autor.trim(),
    genero: form.genero.trim(),
    vecesLeido: Math.max(0, Number(form.vecesLeido) || 0),
    calificacion: Number(form.calificacion) || 0,
  };
  // A finished book has been read at least once.
  if (book.estatus === "Leído" && book.vecesLeido === 0) book.vecesLeido = 1;
  return book;
}

// Books created in the same millisecond (a CSV import) need distinct ids, so
// the timestamp carries a per-session counter.
let sequence = 0;

export function createBookId() {
  sequence += 1;
  return `${Date.now().toString(36)}-${sequence.toString(36)}`;
}

/**
 * Turns a stored ISO date (YYYY-MM-DD) into the DD-MM-YYYY form the cards
 * show. Anything that is not an ISO date comes back untouched.
 */
export function formatDate(iso) {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? "");
  return parts ? `${parts[3]}-${parts[2]}-${parts[1]}` : (iso ?? "");
}

export function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}
