import { useTheme } from "../../hooks/useTheme";

/** Free-text search over the title and the author. */
export function ShelfSearch({ value, onChange }) {
  const { styles } = useTheme();

  return (
    <input
      type="search"
      aria-label="Buscar por título o autor"
      style={{ ...styles.input, fontSize: 14, padding: "10px 12px" }}
      placeholder="Buscar por título o autor"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
