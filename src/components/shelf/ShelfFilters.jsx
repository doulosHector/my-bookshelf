import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { pluralize } from "../../utils/book";
import { ALL_FILTER, STATUSES } from "../../constants/books";
import { RATING_OPTIONS } from "../../constants/shelf";

const ratingLabel = (stars) => `${stars} ${pluralize(stars, "estrella", "estrellas")}`;

/**
 * Status, genre and rating selects, folded away until they are needed. The
 * genre options come from the shelf itself.
 */
export function ShelfFilters({ genres, query, activeFilters, onChange }) {
  const { t, styles } = useTheme();
  const [open, setOpen] = useState(false);

  const set = (field) => (event) => onChange({ [field]: event.target.value });
  const select = { ...styles.input, fontSize: 14, padding: "9px 10px" };

  return (
    <section style={{ ...styles.card, padding: "0 12px" }} aria-label="Filtros">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        style={{
          ...styles.label,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          margin: 0,
          padding: "9px 0",
          background: "none",
          border: "none",
          fontFamily: "inherit",
          cursor: "pointer",
          color: t.ink,
        }}
      >
        <span>
          Filtros
          {activeFilters > 0 && (
            <span style={{ color: t.accent }}> ({activeFilters})</span>
          )}
        </span>
        <span aria-hidden="true" style={{ color: t.muted, fontSize: 11 }}>
          {open ? "▴" : "▾"}
        </span>
      </button>

      {open && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(132px, 1fr))",
            gap: 10,
            padding: "2px 0 12px",
          }}
        >
          <div>
            <label style={styles.label} htmlFor="filtro-estatus">
              Estatus
            </label>
            <select
              id="filtro-estatus"
              style={select}
              value={query.estatus}
              onChange={set("estatus")}
            >
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
        </div>
      )}
    </section>
  );
}
