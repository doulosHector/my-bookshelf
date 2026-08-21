import { useTheme } from "../../hooks/useTheme";

/** Puts the filters and the search back to their starting state. */
export function ShelfClear({ disabled, onClear }) {
  const { styles } = useTheme();

  return (
    <button
      type="button"
      onClick={onClear}
      disabled={disabled}
      title="Quitar los filtros y la búsqueda"
      style={{
        ...styles.btnGhost,
        fontSize: 13,
        padding: "8px 13px",
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      Limpiar filtros
    </button>
  );
}
