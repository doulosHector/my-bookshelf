const QUOTE = '"';
const ROW_SEPARATOR = "\r\n";
const BOM = "\uFEFF";

/** Wraps a value in quotes only when the delimiter, a quote or a break is inside. */
function escapeCell(value, delimiter) {
  const text = value === null || value === undefined ? "" : String(value);
  const needsQuotes =
    text.includes(delimiter) || text.includes(QUOTE) || text.includes("\n") || text.includes("\r");
  return needsQuotes ? `${QUOTE}${text.replaceAll(QUOTE, QUOTE + QUOTE)}${QUOTE}` : text;
}

/**
 * Serializes a matrix of values into an RFC 4180 CSV body.
 * @param {Array<Array<unknown>>} rows
 * @param {string} [delimiter]
 */
export function toCsv(rows, delimiter = ",") {
  return rows
    .map((row) => row.map((cell) => escapeCell(cell, delimiter)).join(delimiter))
    .join(ROW_SEPARATOR);
}

/** Prepends the byte order mark, so spreadsheets open the file as UTF-8. */
export function withBom(text) {
  return `${BOM}${text}`;
}

/**
 * Guesses the delimiter from the first line: spreadsheets in a Spanish locale
 * write semicolons, everyone else writes commas.
 */
export function detectDelimiter(text) {
  const firstLine = text.split(/\r?\n/, 1)[0] ?? "";
  const count = (char) => firstLine.split(char).length - 1;
  return count(";") > count(",") ? ";" : ",";
}

/**
 * Parses a CSV body into a matrix of strings. Handles quoted fields, escaped
 * quotes and line breaks inside a field; fully blank lines are dropped.
 * @param {string} text
 * @param {string} [delimiter]
 * @returns {string[][]}
 */
export function parseCsv(text, delimiter = ",") {
  const input = text.startsWith(BOM) ? text.slice(1) : text;
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];

    if (quoted) {
      if (char !== QUOTE) {
        cell += char;
      } else if (input[i + 1] === QUOTE) {
        cell += QUOTE;
        i += 1;
      } else {
        quoted = false;
      }
      continue;
    }

    if (char === QUOTE && cell === "") {
      quoted = true;
    } else if (char === delimiter) {
      row.push(cell);
      cell = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && input[i + 1] === "\n") i += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  rows.push(row);

  return rows.filter((cells) => cells.some((value) => value.trim() !== ""));
}

/** Lowercases and strips accents, so "Reseña" and "resena" are the same header. */
export function normalizeHeader(header) {
  return header
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/gu, "");
}
