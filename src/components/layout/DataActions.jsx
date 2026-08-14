import { useTheme } from "../../hooks/useTheme";

/** Compact ghost buttons for the CSV export and import. */
export function DataActions({ canExport, onExport }) {
  const { styles } = useTheme();
  const button = { ...styles.btnGhost, padding: "10px 13px", fontSize: 13 };

  return (
    <button
      onClick={onExport}
      disabled={!canExport}
      title={canExport ? "Descargar tus libros en un archivo .csv" : "Aún no tienes libros que exportar"}
      style={{ ...button, opacity: canExport ? 1 : 0.45, cursor: canExport ? "pointer" : "not-allowed" }}
    >
      Exportar
    </button>
  );
}
