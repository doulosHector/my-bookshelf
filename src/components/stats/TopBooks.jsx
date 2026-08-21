import { useTheme } from "../../hooks/useTheme";
import { Stars } from "../ui/Stars";
import { pluralize } from "../../utils/book";

/** A book read once may not carry the count yet, so an empty value means one. */
const readings = (book) => Number(book.vecesLeido) || 1;

/**
 * The best rated books, ties broken by how many times you read them. Replaces
 * the single "best rated" card, which picked an arbitrary winner among ties.
 */
export function TopBooks({ books }) {
  const { t, styles } = useTheme();

  return (
    <section className="panel" style={styles.card}>
      <h3 className="serif" style={{ margin: "0 0 4px", fontSize: 18 }}>
        Top {books.length}
      </h3>
      <p style={{ margin: "0 0 14px", fontSize: 12, color: t.muted }}>
        Por calificación; a igual calificación, el más releído primero.
      </p>

      <ol
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: 10,
        }}
      >
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
              <div
                style={{
                  fontSize: 12,
                  color: t.muted,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {book.autor || "Autor desconocido"} · {readings(book)}{" "}
                {pluralize(readings(book), "lectura", "lecturas")}
              </div>
            </div>

            <Stars value={book.calificacion} size={14} />
          </li>
        ))}
      </ol>
    </section>
  );
}
