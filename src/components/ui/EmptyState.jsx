import { useTheme } from "../../hooks/useTheme";

export function EmptyState({ icon, title, description }) {
  const { t } = useTheme();

  return (
    <div style={{ textAlign: "center", padding: "70px 20px", color: t.muted }}>
      {icon && (
        <div style={{ fontSize: 30, marginBottom: 10, letterSpacing: 6, color: t.border }}>
          {icon}
        </div>
      )}
      <p className="serif" style={{ fontSize: 20, margin: "0 0 6px", color: t.ink }}>
        {title}
      </p>
      <p style={{ fontSize: 14, margin: 0 }}>{description}</p>
    </div>
  );
}
