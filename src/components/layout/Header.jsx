import { useTheme } from "../../hooks/useTheme";
import { ThemeIcon } from "../ui/ThemeIcon";
import { DataActions } from "./DataActions";

export function Header({ stats, onAddBook, canExport, onExport, onImport }) {
  const { theme, t, styles, toggleTheme } = useTheme();

  // Every status is listed, so the counts add up to the shelf.
  const counts = [
    `${stats.totalLeidos} leídos`,
    `${stats.leyendo} en curso`,
    `${stats.pendientes} pendientes`,
    stats.abandonados > 0 ? `${stats.abandonados} abandonados` : "",
  ].filter(Boolean);

  const summary = stats.total === 0 ? "Tu registro personal de lectura" : counts.join(" · ");

  return (
    <header
      style={{
        ...styles.page,
        padding: "28px 20px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <div>
        <h1
          className="serif"
          style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: "-0.01em" }}
        >
          Mi Librero
        </h1>
        <p style={{ margin: "4px 0 0", color: t.muted, fontSize: 14 }}>{summary}</p>
      </div>

      {/* On a phone this takes the whole line under the title, which is why the
          two icon buttons are grouped: they stay together at the right edge
          while the primary action holds the left one. */}
      <div className="header-actions" style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={onAddBook} style={styles.btnPrimary}>
          + Agregar libro
        </button>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <DataActions canExport={canExport} onExport={onExport} onImport={onImport} />
          <button
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro"}
            style={{
              ...styles.btnGhost,
              padding: 8,
              color: t.ink,
              display: "grid",
              placeItems: "center",
            }}
          >
            <ThemeIcon dark={theme === "dark"} />
          </button>
        </div>
      </div>
    </header>
  );
}
