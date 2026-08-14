import { useTheme } from "../../hooks/useTheme";
import { ALL_FILTER, STATUSES } from "../../constants/books";

const OPTIONS = [ALL_FILTER, ...STATUSES];

export function StatusFilter({ value, onChange }) {
  const { t } = useTheme();

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
      {OPTIONS.map((status) => {
        const isActive = value === status;
        return (
          <button
            key={status}
            onClick={() => onChange(status)}
            aria-pressed={isActive}
            style={{
              fontFamily: "inherit",
              fontSize: 13,
              cursor: "pointer",
              borderRadius: 4,
              padding: "6px 13px",
              border: `1px solid ${isActive ? t.accent : t.border}`,
              background: isActive ? t.accentSoft : "transparent",
              color: isActive ? t.accent : t.muted,
              fontWeight: isActive ? 600 : 400,
            }}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}
