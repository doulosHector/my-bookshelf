import { useTheme } from "../../hooks/useTheme";
import { Badge } from "../ui/Badge";
import { Stars } from "../ui/Stars";
import { BookCover } from "../ui/BookCover";
import { spineColor } from "../../utils/spineColor";
import { formatDate } from "../../utils/book";
import { STATUS_STYLE } from "../../constants/books";

/**
 * Wide enough to read the artwork, narrow enough to leave a phone room for the
 * text beside it. The height only applies to the fallback square: a real cover
 * scales to its own proportions.
 */
const COVER = { width: 90, height: 135 };

export function BookCard({ book, onSelect }) {
  const { theme, t, styles } = useTheme();
  const spine = spineColor(book.genero);
  const statusColor = STATUS_STYLE[book.estatus]?.[theme] ?? t.muted;
  const meta = { margin: 0, color: t.muted, fontSize: 14 };

  return (
    <article
      className="book-card"
      onClick={() => onSelect(book)}
      style={{ ...styles.card, display: "flex", overflow: "hidden", cursor: "pointer" }}
    >
      {/* The wrapper is what centers the cover: it stretches to the card's
          height while the cover keeps its own proportions inside it. */}
      {book.portada && (
        <div style={{ display: "flex", alignItems: "center", paddingLeft: 10, flexShrink: 0 }}>
          <BookCover
            coverId={book.portada}
            title={book.titulo}
            genre={book.genero}
            width={COVER.width}
            height={COVER.height}
            fit
          />
        </div>
      )}

      {/* One row per piece of information, in reading order. */}
      <div style={{ padding: "10px 16px", flex: 1, minWidth: 0, display: "grid", gap: 6 }}>
        <h2
          className="serif"
          style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: 1.25 }}
        >
          {book.titulo}
          {book.anio && (
            <span
              // `nowrap` keeps the separator with the year when the title wraps.
              style={{ color: t.muted, fontWeight: 400, fontSize: 13, whiteSpace: "nowrap" }}
            >
              {" · "}
              {book.anio}
            </span>
          )}
        </h2>

        <p style={meta}>
          {book.autor || "Autor desconocido"}
          {book.genero && (
            <>
              {" · "}
              <span style={{ color: spine, fontWeight: 600 }}>{book.genero}</span>
            </>
          )}
        </p>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <Badge text={book.estatus} color={statusColor} />
          {book.calificacion > 0 && <Stars value={book.calificacion} size={15} />}
        </div>

        {book.fechaFin && (
          <p style={{ ...meta, fontSize: 13 }}>Ult. lectura: {formatDate(book.fechaFin)}</p>
        )}
        {book.vecesLeido > 1 && (
          <p style={{ ...meta, fontSize: 13 }}>Leído {book.vecesLeido} veces</p>
        )}
      </div>
    </article>
  );
}
