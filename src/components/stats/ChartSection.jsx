import { useTheme } from "../../hooks/useTheme";
import { BarChart } from "../ui/BarChart";

/**
 * A titled chart. `note` is where a chart says what it leaves out, so its bars
 * can always be reconciled with the totals above.
 */
export function ChartSection({ title, items, labelWidth, note }) {
  const { t, styles } = useTheme();

  return (
    <section style={{ ...styles.card, padding: 20 }}>
      <h3 className="serif" style={{ margin: "0 0 14px", fontSize: 18 }}>
        {title}
      </h3>
      <BarChart items={items} labelWidth={labelWidth} />
      {note && (
        <p style={{ fontSize: 12, color: t.muted, margin: "10px 0 0", lineHeight: 1.5 }}>{note}</p>
      )}
    </section>
  );
}
