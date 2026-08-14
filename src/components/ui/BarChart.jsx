import { useTheme } from "../../hooks/useTheme";

/**
 * Horizontal bar chart used by the stats tab.
 * @param {{label: string, value: number, color?: string}[]} items
 * @param {number} [labelWidth] width reserved for the labels, in px
 */
export function BarChart({ items, labelWidth = 44 }) {
  const { t } = useTheme();
  const max = Math.max(...items.map((item) => item.value));

  return (
    <div>
      {items.map(({ label, value, color }) => (
        <div
          key={label}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}
        >
          <span
            style={{
              width: labelWidth,
              fontSize: 13,
              color: t.muted,
              textAlign: "right",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
          <div style={{ flex: 1, background: t.bg, borderRadius: 3, height: 22, overflow: "hidden" }}>
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
              <span style={{ fontSize: 12, fontWeight: 700, color: color ? "#F4F4F1" : t.onAccent }}>
                {value}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
