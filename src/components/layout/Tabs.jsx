import { useTheme } from "../../hooks/useTheme";

/**
 * @param {{id: string, label: string}[]} tabs
 */
export function Tabs({ tabs, active, onChange }) {
  const { t, styles } = useTheme();

  return (
    <nav
      style={{
        ...styles.page,
        padding: "16px 20px 0",
        display: "flex",
        gap: 4,
        borderBottom: `1px solid ${t.border}`,
      }}
    >
      {tabs.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            aria-current={isActive ? "page" : undefined}
            style={{
              background: "none",
              border: "none",
              fontFamily: "inherit",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? t.ink : t.muted,
              padding: "10px 14px",
              borderBottom: isActive ? `2px solid ${t.accent}` : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
