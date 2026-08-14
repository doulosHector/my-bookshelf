import { finishedYear } from "./book";

const TOP_GENRES = 6;
const DAYS_PER_MONTH = 30;
const MONTHS_PER_YEAR = 12;

const countBy = (books, getKey) =>
  books.reduce((acc, book) => {
    const key = getKey(book);
    if (key !== null && key !== undefined && key !== "") {
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc;
  }, {});

const highest = (books, getValue) =>
  books.reduce((best, book) => (!best || getValue(book) > getValue(best) ? book : best), null);

/**
 * Aggregates the reading stats shown in the "Estadísticas" tab.
 * @param {object[]} books
 * @param {Date} [now] injectable clock, keeps the function testable
 */
export function computeStats(books, now = new Date()) {
  const leidos = books.filter((b) => b.estatus === "Leído");
  const currentYear = now.getFullYear();

  const porAnio = countBy(leidos, finishedYear);
  const porGenero = countBy(leidos, (b) => b.genero);
  const generoTop = Object.entries(porGenero).sort((a, b) => b[1] - a[1])[0] || null;

  const masReleido = highest(
    books.filter((b) => b.vecesLeido > 1),
    (b) => b.vecesLeido,
  );
  const mejorCalificado = highest(
    books.filter((b) => b.calificacion > 0),
    (b) => b.calificacion,
  );

  // Reading pace: books per month so far this year, plus a year-end projection.
  const esteAnio = porAnio[currentYear] || 0;
  const mesesTranscurridos = now.getMonth() + now.getDate() / DAYS_PER_MONTH;
  const ritmo = esteAnio > 0 ? esteAnio / mesesTranscurridos : 0;

  return {
    total: books.length,
    totalLeidos: leidos.length,
    esteAnio,
    ritmo: ritmo > 0 ? ritmo.toFixed(1) : "—",
    proyeccion: ritmo > 0 ? Math.round(ritmo * MONTHS_PER_YEAR) : 0,
    porAnio: Object.entries(porAnio).sort((a, b) => a[0] - b[0]),
    porGenero: Object.entries(porGenero)
      .sort((a, b) => b[1] - a[1])
      .slice(0, TOP_GENRES),
    generoTop,
    masReleido,
    mejorCalificado,
    leyendo: books.filter((b) => b.estatus === "Leyendo").length,
    pendientes: books.filter((b) => b.estatus === "Pendiente").length,
  };
}
