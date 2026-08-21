import { useTheme } from "../../hooks/useTheme";
import { Badge } from "../ui/Badge";
import { Stars } from "../ui/Stars";
import { spineColor } from "../../utils/spineColor";
import { truncate } from "../../utils/book";
import { MAX_REVIEW_PREVIEW, STATUS_STYLE } from "../../constants/books";

export function BookCard({ book, onSelect }) {
  const { theme, t, styles } = useTheme();
  const spine = spineColor(book.genero);
  const statusColor = STATUS_STYLE[book.estatus]?.[theme] ?? t.muted;

  return (
    <article
      className="book-card"
      onClick={() => onSelect(book)}
      style={{ ...styles.card, display: "flex", overflow: "hidden", cursor: "pointer" }}
    >
      <div style={{ width: 7, background: spine, flexShrink: 0 }} aria-hidden="true" />

      <div style={{ padding: "16px 18px", flex: 1, minWidth: 0 }}>
        <h2 className="serif" style={{ margin: 0, fontSize: 19, fontWeight: 600, lineHeight: 1.3 }}>
          {book.titulo}
          {book.anio && (
            <span style={{ color: t.muted, fontWeight: 400, fontSize: 14 }}> · {book.anio}</span>
          )}
        </h2>

        <div style={{ margin: "7px 0 0" }}>
          <Badge text={book.estatus} color={statusColor} />
        </div>

        <p style={{ margin: "8px 0 10px", color: t.muted, fontSize: 14 }}>
          {book.autor || "Autor desconocido"}
          {book.genero && (
            <>
              {" · "}
              <span style={{ color: spine, fontWeight: 600 }}>{book.genero}</span>
            </>
          )}
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            flexWrap: "wrap",
            fontSize: 13,
            color: t.muted,
          }}
        >
          {book.calificacion > 0 && <Stars value={book.calificacion} size={15} />}
          {book.fechaFin && <span>Terminado: {book.fechaFin}</span>}
          {book.vecesLeido > 1 && <span>Leído {book.vecesLeido} veces</span>}
        </div>

        {book.resena && (
          <p
            className="serif"
            style={{
              margin: "10px 0 0",
              fontSize: 14,
              fontStyle: "italic",
              color: t.ink,
              opacity: 0.85,
              whiteSpace: "pre-wrap",
            }}
          >
            “{truncate(book.resena, MAX_REVIEW_PREVIEW)}”
          </p>
        )}
      </div>
    </article>
  );
}
