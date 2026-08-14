import { useTheme } from "../../hooks/useTheme";
import { MAX_LISTED_ERRORS } from "../../constants/csv";
import { pluralize } from "../../utils/book";

/** What the picked file contains: how much is importable and what will be skipped. */
export function ImportPreview({ fileName, result }) {
  const { t } = useTheme();
  const { books, errors, ignoredColumns } = result;

  const listed = errors.slice(0, MAX_LISTED_ERRORS);
  const hidden = errors.length - listed.length;

  const panel = {
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    padding: "12px 14px",
    fontSize: 13,
    display: "grid",
    gap: 8,
  };

  return (
    <div style={panel}>
      <div style={{ color: t.muted }}>{fileName}</div>

      <strong style={{ color: books.length > 0 ? t.ink : t.danger, fontSize: 15 }}>
        {books.length > 0
          ? `${books.length} ${pluralize(books.length, "libro listo", "libros listos")} para importar`
          : "No hay libros que importar"}
      </strong>

      {errors.length > 0 && (
        <div>
          <div style={{ color: t.danger, marginBottom: 4 }}>
            {errors.length === 1 && errors[0].row === null
              ? "Problema encontrado:"
              : `${pluralize(errors.length, "Se omitirá", "Se omitirán")} ${errors.length} ${pluralize(errors.length, "fila", "filas")}:`}
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, color: t.muted, display: "grid", gap: 2 }}>
            {listed.map((error, index) => (
              <li key={`${error.row}-${index}`}>
                {error.row === null ? error.message : `Fila ${error.row}: ${error.message}.`}
              </li>
            ))}
            {hidden > 0 && <li>y {hidden} más…</li>}
          </ul>
        </div>
      )}

      {ignoredColumns.length > 0 && (
        <div style={{ color: t.muted }}>
          Columnas que no se reconocen y se ignoran: {ignoredColumns.join(", ")}.
        </div>
      )}
    </div>
  );
}
