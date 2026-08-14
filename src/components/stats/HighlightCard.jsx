import { useTheme } from "../../hooks/useTheme";

/** Small card highlighting one book or genre: label, title and a detail line. */
export function HighlightCard({ label, title, titleColor, children }) {
  const { styles } = useTheme();

  return (
    <div style={{ ...styles.card, padding: 18 }}>
      <div style={styles.label}>{label}</div>
      <div className="serif" style={{ fontSize: 20, color: titleColor }}>
        {title}
      </div>
      {children}
    </div>
  );
}
