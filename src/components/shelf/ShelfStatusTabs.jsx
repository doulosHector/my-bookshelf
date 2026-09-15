import { useTheme } from "../../hooks/useTheme";
import { ALL_FILTER, STATUSES } from "../../constants/books";

const OPTIONS = [ALL_FILTER, ...STATUSES];

/**
 * The status filter as a second row of tabs, smaller than the main ones so it
 * reads as subordinate to them. Five options do not fit on a phone, so the row
 * scrolls sideways instead of wrapping into two lines.
 */
export function ShelfStatusTabs({ value, onChange }) {
  const { t } = useTheme();

  return (
    <div
      className="scroll-row"
      role="group"
      aria-label="Filtrar por estatus"
      style={{ display: "flex", gap: 2, borderBottom: `1px solid ${t.border}` }}
    >
      {OPTIONS.map((status) => {
        const isActive = value === status;
        return (
          <button
            key={status}
            type="button"
            // Not a real tab: it filters the list in place, it does not swap panels.
            aria-pressed={isActive}
            onClick={() => onChange(status)}
            style={{
              background: "none",
              border: "none",
              fontFamily: "inherit",
              cursor: "pointer",
              flexShrink: 0,
              whiteSpace: "nowrap",
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? t.ink : t.muted,
              padding: "7px 11px",
              borderBottom: isActive ? `2px solid ${t.accent}` : "2px solid transparent",
              // Sits on the row's own line instead of stacking under it.
              marginBottom: -1,
            }}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}
