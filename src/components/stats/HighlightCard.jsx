import { useTheme } from "../../hooks/useTheme";

/** Small card highlighting one book or genre: label, title and a detail line. */
export function HighlightCard({ label, title, titleColor, children }) {
  const { styles } = useTheme();

  return (
    <div className="highlight-card" style={styles.card}>
      <div style={styles.label}>{label}</div>
      <div className="highlight-card__title serif" style={{ color: titleColor }}>
        {title}
      </div>
      {children}
    </div>
  );
}
