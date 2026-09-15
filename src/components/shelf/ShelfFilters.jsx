import { useTheme } from "../../hooks/useTheme";
import { pluralize } from "../../utils/book";
import { ALL_FILTER } from "../../constants/books";
import { RATING_OPTIONS } from "../../constants/shelf";

const ratingLabel = (stars) => `${stars} ${pluralize(stars, "estrella", "estrellas")}`;

/**
 * Genre and rating side by side. The neutral option names the field, so the
 * selects need no label above them and the row stays short. The status lives
 * in its own tab row, and the genre options come from the shelf itself.
 */
export function ShelfFilters({ genres, query, onChange }) {
  const { t, styles } = useTheme();

  const set = (field) => (event) => onChange({ [field]: event.target.value });

  /** An active filter takes the accent, so it is visible at a glance. */
  const select = (value) => ({
    ...styles.input,
    fontSize: 13,
    padding: "6px 8px",
    color: value === ALL_FILTER ? t.muted : t.ink,
    borderColor: value === ALL_FILTER ? t.border : t.accent,
  });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
      <select
        aria-label="Filtrar por género"
        style={select(query.genero)}
        value={query.genero}
        onChange={set("genero")}
      >
        <option value={ALL_FILTER}>Todos los géneros</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <select
        aria-label="Filtrar por calificación"
        style={select(query.calificacion)}
        value={query.calificacion}
        onChange={set("calificacion")}
      >
        <option value={ALL_FILTER}>Todas las estrellas</option>
        {RATING_OPTIONS.map((stars) => (
          <option key={stars} value={stars}>
            {ratingLabel(stars)}
          </option>
        ))}
      </select>
    </div>
  );
}
