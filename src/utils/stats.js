const TOP_GENRES = 6;
const TOP_BOOKS = 5;
const MONTHS_PER_YEAR = 12;
const DAYS_PER_MONTH = 30.44;
const MS_PER_DAY = 86_400_000;
const MS_PER_MONTH = DAYS_PER_MONTH * MS_PER_DAY;
const RATINGS = [5, 4, 3, 2, 1];

const MONTH_LABELS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

/** Both `fechaFin` (YYYY-MM-DD) and `agregado` (full ISO) end up here. */
function parseDate(value) {
  if (!value) return null;
  const text = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00` : value;
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}

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

const sum = (books, getValue) => books.reduce((acc, book) => acc + getValue(book), 0);

/**
 * Reading pace over the trailing twelve months. Anchoring it to the calendar
 * year made January meaningless: one book on the 5th read as six a month. The
 * window shrinks to the time actually tracked, and never below a month, so a
 * shelf that started last week does not project a hundred books a year.
 */
function readingPace(finishedDates, now) {
  if (finishedDates.length === 0) return { ritmo: 0, ultimos12: 0 };

  const windowStart = now.getTime() - MONTHS_PER_YEAR * MS_PER_MONTH;
  const recent = finishedDates.filter((date) => date.getTime() >= windowStart);
  const first = Math.min(...finishedDates.map((date) => date.getTime()));
  const tracked = (now.getTime() - first) / MS_PER_MONTH;
  const months = Math.min(MONTHS_PER_YEAR, Math.max(1, tracked));

  return { ritmo: recent.length / months, ultimos12: recent.length };
}

/** Books finished each month of the current year, up to the month we are in. */
function monthlyCount(leidos, now) {
  const currentYear = now.getFullYear();
  const finished = leidos
    .map((book) => parseDate(book.fechaFin))
    .filter((date) => date && date.getFullYear() === currentYear);

  return MONTH_LABELS.slice(0, now.getMonth() + 1).map((label, month) => [
    label,
    finished.filter((date) => date.getMonth() === month).length,
  ]);
}

/** Best rated first; books tied on stars are ordered by the latest reading. */
function byRatingThenReading(a, b) {
  return (
    b.calificacion - a.calificacion || (b.fechaFin || "").localeCompare(a.fechaFin || "")
  );
}

/**
 * Aggregates the reading stats shown in the "Estadísticas" tab.
 * @param {object[]} books
 * @param {Date} [now] injectable clock, keeps the function testable
 */
export function computeStats(books, now = new Date()) {
  const leidos = books.filter((b) => b.estatus === "Leído");
  const abandonados = books.filter((b) => b.estatus === "Abandonado");
  const calificados = books.filter((b) => b.calificacion > 0);
  const currentYear = now.getFullYear();

  const finishedDates = leidos.map((b) => parseDate(b.fechaFin)).filter(Boolean);

  const porAnio = countBy(leidos, (b) => parseDate(b.fechaFin)?.getFullYear() ?? null);
  const porGenero = countBy(leidos, (b) => b.genero);
  const generoTop = Object.entries(porGenero).sort((a, b) => b[1] - a[1])[0] || null;

  const masReleido = highest(
    books.filter((b) => b.vecesLeido > 1),
    (b) => b.vecesLeido,
  );

  const { ritmo, ultimos12 } = readingPace(finishedDates, now);

  return {
    total: books.length,
    totalLeidos: leidos.length,
    leyendo: books.filter((b) => b.estatus === "Leyendo").length,
    pendientes: books.filter((b) => b.estatus === "Pendiente").length,
    abandonados: abandonados.length,

    // Re-reads: a book read four times is one book but four readings.
    lecturas: sum(books, (b) => Number(b.vecesLeido) || 0),

    anioActual: currentYear,
    esteAnio: porAnio[currentYear] || 0,
    ritmo: ritmo > 0 ? ritmo.toFixed(1) : "—",
    ultimos12,

    promedio: calificados.length > 0 ? sum(calificados, (b) => b.calificacion) / calificados.length : 0,
    calificados: calificados.length,
    sinCalificar: books.length - calificados.length,
    porCalificacion: RATINGS.map((stars) => [
      stars,
      calificados.filter((b) => b.calificacion === stars).length,
    ]),
    porAnio: Object.entries(porAnio).sort((a, b) => a[0] - b[0]),
    porMes: monthlyCount(leidos, now),
    porGenero: Object.entries(porGenero)
      .sort((a, b) => b[1] - a[1])
      .slice(0, TOP_GENRES),
    generoTop,
    masReleido,
    top: [...calificados].sort(byRatingThenReading).slice(0, TOP_BOOKS),
  };
}
