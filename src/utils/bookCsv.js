import { CSV_COLUMNS, CSV_FILE_PREFIX, CSV_REQUIRED_KEY } from "../constants/csv";
import { STATUSES } from "../constants/books";
import { detectDelimiter, normalizeHeader, parseCsv, toCsv } from "./csv";
import { normalizeBook } from "./book";

const DEFAULT_STATUS = "Pendiente";
const MAX_RATING = 5;

/** The whole shelf as a CSV body, one row per book, in CSV_COLUMNS order. */
export function booksToCsv(books) {
  const header = CSV_COLUMNS.map((column) => column.key);
  const rows = books.map((book) => CSV_COLUMNS.map((column) => book[column.key] ?? ""));
  return toCsv([header, ...rows]);
}

/** Header row plus one filled-in example, offered as a starting point. */
export function csvTemplate() {
  return toCsv([CSV_COLUMNS.map((c) => c.key), CSV_COLUMNS.map((c) => c.example)]);
}

/** e.g. mi-librero-2026-08-14.csv, using the local date. */
export function csvFileName(date) {
  const pad = (value) => String(value).padStart(2, "0");
  const stamp = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  return `${CSV_FILE_PREFIX}-${stamp}.csv`;
}

export const CSV_TEMPLATE_FILE_NAME = `${CSV_FILE_PREFIX}-plantilla.csv`;

/** Matches a header written in the file against a column key or one of its aliases. */
function columnKeyFor(header) {
  const normalized = normalizeHeader(header);
  const column = CSV_COLUMNS.find(
    (candidate) =>
      normalizeHeader(candidate.key) === normalized ||
      candidate.aliases?.some((alias) => normalizeHeader(alias) === normalized),
  );
  return column?.key ?? null;
}

/** Parses an integer cell; "" counts as 0 and anything else as invalid (null). */
function toInteger(value) {
  if (!value) return 0;
  const number = Number(value);
  return Number.isInteger(number) ? number : null;
}

function isRealDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return !Number.isNaN(new Date(`${value}T12:00:00`).getTime());
}

/**
 * Validates one row and turns it into a book.
 * @returns {{book: object|null, problems: string[]}}
 */
function rowToBook(cells) {
  const problems = [];
  const value = (key) => cells[key] ?? "";

  const titulo = value("titulo").trim();
  if (!titulo) problems.push("falta el título");

  const estatus = value("estatus").trim() || DEFAULT_STATUS;
  if (!STATUSES.includes(estatus)) {
    problems.push(`estatus "${estatus}" desconocido, usa ${STATUSES.join(", ")}`);
  }

  const fechaFin = value("fechaFin").trim();
  if (fechaFin && !isRealDate(fechaFin)) {
    problems.push(`fecha de fin "${fechaFin}" no válida, usa AAAA-MM-DD`);
  }

  const vecesLeido = toInteger(value("vecesLeido").trim());
  if (vecesLeido === null || vecesLeido < 0) {
    problems.push(`veces leído "${value("vecesLeido")}" no es un número entero de 0 o más`);
  }

  const calificacion = toInteger(value("calificacion").trim());
  if (calificacion === null || calificacion < 0 || calificacion > MAX_RATING) {
    problems.push(`calificación "${value("calificacion")}" no es un número entero de 0 a ${MAX_RATING}`);
  }

  const portada = value("portada").trim();
  if (portada && !/^\d+$/.test(portada)) {
    problems.push(`portada "${portada}" no es un id numérico de Open Library`);
  }

  if (problems.length > 0) return { book: null, problems };

  return {
    book: normalizeBook({
      id: value("id").trim() || null,
      titulo,
      autor: value("autor"),
      anio: value("anio").trim(),
      genero: value("genero"),
      estatus,
      fechaFin,
      vecesLeido,
      calificacion,
      resena: value("resena"),
      portada,
      agregado: value("agregado").trim() || new Date().toISOString(),
    }),
    problems,
  };
}

/**
 * Reads an exported (or hand-written) CSV back into books. Rows that fail
 * validation are reported and skipped; the valid ones can still be imported.
 * @param {string} text
 * @returns {{books: object[], errors: {row: number|null, message: string}[], ignoredColumns: string[]}}
 */
export function parseBooksCsv(text) {
  const empty = { books: [], errors: [], ignoredColumns: [] };
  const rows = parseCsv(text, detectDelimiter(text));

  if (rows.length === 0) {
    return { ...empty, errors: [{ row: null, message: "El archivo está vacío." }] };
  }

  const [headerRow, ...dataRows] = rows;
  const keys = headerRow.map(columnKeyFor);
  const ignoredColumns = headerRow.filter((header, index) => keys[index] === null && header.trim());

  if (!keys.includes(CSV_REQUIRED_KEY)) {
    return {
      ...empty,
      ignoredColumns,
      errors: [{ row: null, message: `El archivo no tiene la columna "${CSV_REQUIRED_KEY}".` }],
    };
  }
  if (dataRows.length === 0) {
    return { ...empty, ignoredColumns, errors: [{ row: null, message: "El archivo no tiene libros." }] };
  }

  const books = [];
  const errors = [];
  const seenIds = new Set();

  dataRows.forEach((cells, index) => {
    // +2: the header is row 1 and spreadsheets count from 1.
    const row = index + 2;
    const named = {};
    keys.forEach((key, column) => {
      if (key) named[key] = cells[column] ?? "";
    });

    const { book, problems } = rowToBook(named);
    if (book && book.id) {
      if (seenIds.has(book.id)) problems.push(`el id "${book.id}" se repite en el archivo`);
      else seenIds.add(book.id);
    }

    if (problems.length > 0) errors.push({ row, message: problems.join("; ") });
    else books.push(book);
  });

  return { books, errors, ignoredColumns };
}
