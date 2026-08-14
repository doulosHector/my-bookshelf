import { useTheme } from "../../hooks/useTheme";
import { ThemeIcon } from "../ui/ThemeIcon";

export function Header({ stats, onAddBook }) {
  const { theme, t, styles, toggleTheme } = useTheme();

  const summary =
    stats.total === 0
      ? "Tu registro personal de lectura"
      : `${stats.totalLeidos} leídos · ${stats.leyendo} en curso · ${stats.pendientes} pendientes`;

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
          Mi Libero Personal
        </h1>
        <p style={{ margin: "4px 0 0", color: t.muted, fontSize: 14 }}>{summary}</p>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro"}
          style={{ ...styles.btnGhost, padding: 11, color: t.ink, display: "grid", placeItems: "center" }}
        >
          <ThemeIcon dark={theme === "dark"} />
        </button>
        <button onClick={onAddBook} style={styles.btnPrimary}>
          + Agregar libro
        </button>
      </div>
    </header>
  );
}
