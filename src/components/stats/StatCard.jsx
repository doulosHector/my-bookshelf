import { useTheme } from "../../hooks/useTheme";

/**
 * One number with its label. The layout lives in index.css: on a phone the
 * card turns into a short row so the five tiles do not fill the screen.
 */
export function StatCard({ label, value, hint }) {
  const { styles } = useTheme();

  return (
    <div className="stat-card" style={styles.card}>
      <div className="stat-card__value serif">{value}</div>
      <div>
        <div className="stat-card__label">{label}</div>
        {hint && <div className="stat-card__hint">{hint}</div>}
      </div>
    </div>
  );
}
