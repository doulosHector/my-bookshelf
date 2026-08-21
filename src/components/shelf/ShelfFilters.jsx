import { useTheme } from "../../hooks/useTheme";
import { pluralize } from "../../utils/book";
import { ALL_FILTER, STATUSES } from "../../constants/books";
import { RATING_OPTIONS } from "../../constants/shelf";

const ratingLabel = (stars) => `${stars} ${pluralize(stars, "estrella", "estrellas")}`;

/** Status, genre and rating selects. The genres come from the shelf itself. */
export function ShelfFilters({ genres, query, onChange }) {
  const { styles } = useTheme();

  const set = (field) => (event) => onChange({ [field]: event.target.value });
  const select = { ...styles.input, fontSize: 14, padding: "9px 10px" };

  return (
    <section
      style={{
        ...styles.card,
        padding: "12px 12px 14px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(132px, 1fr))",
        gap: 10,
      }}
      aria-label="Filtros"
    >
      <div>
        <label style={styles.label} htmlFor="filtro-estatus">
          Estatus
        </label>
        <select id="filtro-estatus" style={select} value={query.estatus} onChange={set("estatus")}>
          <option value={ALL_FILTER}>Todos</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={styles.label} htmlFor="filtro-genero">
          Género
        </label>
        <select id="filtro-genero" style={select} value={query.genero} onChange={set("genero")}>
          <option value={ALL_FILTER}>Todos</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={styles.label} htmlFor="filtro-calificacion">
          Calificación
        </label>
        <select
          id="filtro-calificacion"
          style={select}
          value={query.calificacion}
          onChange={set("calificacion")}
        >
          <option value={ALL_FILTER}>Cualquiera</option>
          {RATING_OPTIONS.map((stars) => (
            <option key={stars} value={stars}>
              {ratingLabel(stars)}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
