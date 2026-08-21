import { useTheme } from "../../hooks/useTheme";
import { Stars } from "../ui/Stars";
import { formatDate } from "../../utils/book";

/**
 * The best rated books, ties broken by the latest reading. Replaces the single
 * "best rated" card, which picked an arbitrary winner once several books tied.
 */
export function TopBooks({ books }) {
  const { t, styles } = useTheme();

  return (
    <section className="panel" style={styles.card}>
      <h3 className="serif" style={{ margin: "0 0 4px", fontSize: 18 }}>
        Top {books.length}
      </h3>
      <p style={{ margin: "0 0 14px", fontSize: 12, color: t.muted }}>
        Por calificación; a igual calificación, la lectura más reciente primero.
      </p>

      <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
        {books.map((book, index) => (
          <li
            key={book.id ?? book.titulo}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              paddingTop: index === 0 ? 0 : 10,
              borderTop: index === 0 ? "none" : `1px solid ${t.border}`,
            }}
          >
            <span
              className="serif"
              style={{ fontSize: 20, color: t.muted, width: 22, flexShrink: 0 }}
            >
              {index + 1}
            </span>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                className="serif"
                style={{
                  fontSize: 16,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {book.titulo}
              </div>
              <div style={{ fontSize: 12, color: t.muted }}>
                {book.autor || "Autor desconocido"}
                {book.fechaFin && ` · ${formatDate(book.fechaFin)}`}
              </div>
            </div>

            <Stars value={book.calificacion} size={14} />
          </li>
        ))}
      </ol>
    </section>
  );
}
