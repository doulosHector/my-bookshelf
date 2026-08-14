import { useTheme } from "../../hooks/useTheme";
import { Stars } from "../ui/Stars";
import { GENRES, STATUSES } from "../../constants/books";

const twoColumns = (template = "1fr 1fr") => ({
  display: "grid",
  gridTemplateColumns: template,
  gap: 10,
});

export function BookFormFields({ form, onChange }) {
  const { styles } = useTheme();
  const set = (field) => (event) => onChange({ [field]: event.target.value });

  // The date and re-read count only make sense once the reading has ended.
  const showReadingEnd =
    form.estatus === "Leído" || form.estatus === "Abandonado" || Boolean(form.fechaFin);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div>
        <label style={styles.label} htmlFor="f-titulo">
          Título *
        </label>
        <input id="f-titulo" style={styles.input} value={form.titulo} onChange={set("titulo")} />
      </div>

      <div style={twoColumns("1fr 100px")}>
        <div>
          <label style={styles.label} htmlFor="f-autor">
            Autor
          </label>
          <input id="f-autor" style={styles.input} value={form.autor} onChange={set("autor")} />
        </div>
        <div>
          <label style={styles.label} htmlFor="f-anio">
            Año
          </label>
          <input
            id="f-anio"
            style={styles.input}
            value={form.anio}
            onChange={set("anio")}
            placeholder="1985"
          />
        </div>
      </div>

      <div style={twoColumns()}>
        <div>
          <label style={styles.label} htmlFor="f-genero">
            Género principal
          </label>
          <input
            id="f-genero"
            style={styles.input}
            list="generos"
            value={form.genero}
            onChange={set("genero")}
          />
          <datalist id="generos">
            {GENRES.map((genre) => (
              <option key={genre} value={genre} />
            ))}
          </datalist>
        </div>
        <div>
          <label style={styles.label} htmlFor="f-estatus">
            Estatus
          </label>
          <select
            id="f-estatus"
            style={styles.input}
            value={form.estatus}
            onChange={set("estatus")}
          >
            {STATUSES.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {showReadingEnd && (
        <div style={twoColumns()}>
          <div>
            <label style={styles.label} htmlFor="f-fecha">
              Fecha de fin de lectura
            </label>
            <input
              id="f-fecha"
              type="date"
              style={styles.input}
              value={form.fechaFin}
              onChange={set("fechaFin")}
            />
          </div>
          <div>
            <label style={styles.label} htmlFor="f-veces">
              Veces leído
            </label>
            <input
              id="f-veces"
              type="number"
              min="0"
              style={styles.input}
              value={form.vecesLeido}
              onChange={set("vecesLeido")}
            />
          </div>
        </div>
      )}

      <div>
        <label style={styles.label}>Calificación</label>
        <Stars
          value={form.calificacion}
          onChange={(calificacion) => onChange({ calificacion })}
          size={26}
        />
      </div>

      <div>
        <label style={styles.label} htmlFor="f-resena">
          Reseña
        </label>
        <textarea
          id="f-resena"
          rows={4}
          style={{ ...styles.input, resize: "vertical" }}
          placeholder="¿Qué te dejó este libro?"
          value={form.resena}
          onChange={set("resena")}
        />
      </div>
    </div>
  );
}
