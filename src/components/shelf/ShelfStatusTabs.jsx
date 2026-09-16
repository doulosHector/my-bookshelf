import { useTheme } from "../../hooks/useTheme";
import { ALL_FILTER, STATUSES } from "../../constants/books";

const OPTIONS = [ALL_FILTER, ...STATUSES];

/**
 * The status filter as a second row of tabs, smaller than the main ones so it
 * reads as subordinate to them. Five options do not fit on a phone, so the row
 * scrolls sideways instead of wrapping into two lines.
 *
 * Each tab carries how many books it holds, which is where the shelf's numbers
 * live now that the header no longer lists them.
 */
export function ShelfStatusTabs({ value, counts, onChange }) {
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
            <span
              // Dimmer than the label at every state, so the tab still reads as
              // a word first and a number second.
              style={{ marginLeft: 5, fontSize: 11, fontWeight: 400, color: t.muted }}
            >
              {counts[status] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
