import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

/**
 * Export and import folded into one menu, so the header keeps its width for
 * the actions a reader uses every day.
 */
export function DataActions({ canExport, onExport, onImport }) {
  const { t, styles } = useTheme();
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  // A click outside the menu, or Escape, puts it away.
  useEffect(() => {
    if (!open) return undefined;

    const close = (event) => {
      if (event.type === "keydown" && event.key !== "Escape") return;
      if (event.type === "pointerdown" && box.current?.contains(event.target)) return;
      setOpen(false);
    };

    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const choose = (action) => () => {
    setOpen(false);
    action();
  };

  const item = (enabled) => ({
    display: "block",
    width: "100%",
    textAlign: "left",
    background: "none",
    border: "none",
    borderRadius: 0,
    fontFamily: "inherit",
    fontSize: 13,
    color: t.ink,
    padding: "9px 14px",
    cursor: enabled ? "pointer" : "not-allowed",
    opacity: enabled ? 1 : 0.45,
  });

  return (
    <div ref={box} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Exportar o importar libros"
        title="Exportar o importar tus libros"
        // Sized like the theme toggle next to it, so the two icon buttons match.
        style={{ ...styles.btnGhost, color: t.ink, padding: "8px 12px", fontSize: 16, lineHeight: 1 }}
      >
        ⋯
      </button>

      {open && (
        <div
          role="menu"
          style={{
            ...styles.card,
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            minWidth: 168,
            padding: "4px 0",
            overflow: "hidden",
            zIndex: 20,
          }}
        >
          <button
            type="button"
            role="menuitem"
            onClick={choose(onExport)}
            disabled={!canExport}
            title={canExport ? "Descargar tus libros en un archivo .csv" : "Aún no tienes libros"}
            style={item(canExport)}
          >
            Exportar CSV
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={choose(onImport)}
            title="Cargar libros desde un archivo .csv"
            style={item(true)}
          >
            Importar CSV
          </button>
        </div>
      )}
    </div>
  );
}
