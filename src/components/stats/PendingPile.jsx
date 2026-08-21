import { useTheme } from "../../hooks/useTheme";
import { formatDate, pluralize } from "../../utils/book";

/** "3 meses", or years once the wait stops fitting in months. */
function waitLabel(months) {
  const rounded = Math.max(1, Math.round(months));
  if (rounded < 12) return `${rounded} ${pluralize(rounded, "mes", "meses")}`;

  const years = (months / 12).toFixed(1).replace(".0", "");
  return `${years} ${years === "1" ? "año" : "años"}`;
}

/** The date a book joined the shelf, from the ISO timestamp stored on it. */
const addedOn = (book) => (book.agregado ? formatDate(book.agregado.slice(0, 10)) : "");

/**
 * How big the unread pile is and how long it would take to clear at the
 * current pace. Uses `agregado`, which nothing else on screen reads.
 */
export function PendingPile({ count, months, oldest }) {
  const { t, styles } = useTheme();

  return (
    <section className="panel" style={styles.card}>
      <h3 className="serif" style={{ margin: "0 0 4px", fontSize: 18 }}>
        Tu pila de pendientes
      </h3>
      <p style={{ margin: "0 0 14px", fontSize: 14, color: t.muted }}>
        {count} {pluralize(count, "libro", "libros")} esperando
        {months !== null && ` · ≈ ${waitLabel(months)} para terminarla a tu ritmo actual`}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 8 }}>
        {oldest.map((book) => (
          <div
            key={book.id ?? book.titulo}
            style={{ display: "flex", gap: 10, justifyContent: "space-between", fontSize: 13 }}
          >
            <span
              style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            >
              {book.titulo}
            </span>
            <span style={{ color: t.muted, flexShrink: 0 }}>
              {addedOn(book) ? `desde ${addedOn(book)}` : "sin fecha de registro"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
