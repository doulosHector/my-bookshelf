import { CSV_COLUMNS, CSV_FILE_PREFIX } from "../constants/csv";
import { toCsv } from "./csv";

/** The whole shelf as a CSV body, one row per book, in CSV_COLUMNS order. */
export function booksToCsv(books) {
  const header = CSV_COLUMNS.map((column) => column.key);
  const rows = books.map((book) => CSV_COLUMNS.map((column) => book[column.key] ?? ""));
  return toCsv([header, ...rows]);
}

/** e.g. mi-librero-2026-08-14.csv, using the local date. */
export function csvFileName(date) {
  const pad = (value) => String(value).padStart(2, "0");
  const stamp = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  return `${CSV_FILE_PREFIX}-${stamp}.csv`;
}
