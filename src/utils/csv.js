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
