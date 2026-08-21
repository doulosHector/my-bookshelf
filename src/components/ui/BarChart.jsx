import { useTheme } from "../../hooks/useTheme";

/**
 * Horizontal bar chart used by the stats tab.
 * @param {{label: string, value: number, color?: string}[]} items
 * @param {number} [labelWidth] width reserved for the labels, in px
 */
export function BarChart({ items, labelWidth = 44 }) {
  const { t } = useTheme();
  // Guarded: a chart where every value is zero would divide by zero.
  const max = Math.max(1, ...items.map((item) => item.value));

  return (
    <div>
      {items.map(({ label, value, color }) => (
        <div
          key={label}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}
        >
          <span className="bar-chart__label" style={{ width: labelWidth }}>
            {label}
          </span>
          <div style={{ flex: 1, background: t.bg, borderRadius: 3, height: 22, overflow: "hidden" }}>
            {value > 0 ? (
              <div
                style={{
                  width: `${(value / max) * 100}%`,
                  minWidth: 26,
                  height: "100%",
                  background: color || t.accent,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: 8,
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{ fontSize: 12, fontWeight: 700, color: color ? "#F4F4F1" : t.onAccent }}
                >
                  {value}
                </span>
              </div>
            ) : (
              <span style={{ fontSize: 12, color: t.muted, padding: "0 8px", lineHeight: "22px" }}>
                0
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
