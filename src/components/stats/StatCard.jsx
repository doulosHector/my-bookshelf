import { useTheme } from "../../hooks/useTheme";

export function StatCard({ label, value, hint }) {
  const { t, styles } = useTheme();

  return (
    <div style={{ ...styles.card, padding: "18px 16px" }}>
      <div className="serif" style={{ fontSize: 32, fontWeight: 600, color: t.accent }}>
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          color: t.muted,
          textTransform: "uppercase",
          letterSpacing: "0.09em",
          fontWeight: 700,
          marginTop: 4,
        }}
      >
        {label}
      </div>
      {hint && <div style={{ fontSize: 12, color: t.muted, marginTop: 6 }}>{hint}</div>}
    </div>
  );
}
