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

export function createBookId() {
  return Date.now().toString(36);
}

/** Year in which the book was finished, or null when there is no valid date. */
export function finishedYear(book) {
  if (!book.fechaFin) return null;
  const year = new Date(`${book.fechaFin}T12:00:00`).getFullYear();
  return Number.isNaN(year) ? null : year;
}

export function truncate(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}

export function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}
