import { useTheme } from "../../hooks/useTheme";

/** Free-text search over the title and the author. */
export function ShelfSearch({ value, onChange }) {
  const { styles } = useTheme();

  return (
    <div>
      <label style={styles.label} htmlFor="buscar-libro">
        Buscar
      </label>
      <input
        id="buscar-libro"
        type="search"
        style={{ ...styles.input, fontSize: 14, padding: "9px 10px" }}
        placeholder="Título o autor"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
