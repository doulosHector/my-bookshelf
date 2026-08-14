import { useTheme } from "../../hooks/useTheme";

const RATINGS = [1, 2, 3, 4, 5];

/**
 * Five star rating. Read-only when `onChange` is omitted.
 * Clicking the current value clears the rating.
 */
export function Stars({ value, onChange, size = 20 }) {
  const { t } = useTheme();
  const editable = Boolean(onChange);

  return (
    <div style={{ display: "flex", gap: 2 }} aria-label="Calificación">
      {RATINGS.map((n) => (
        <button
          key={n}
          type="button"
          disabled={!editable}
          onClick={() => onChange?.(n === value ? 0 : n)}
          aria-label={`${n} estrellas`}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: editable ? "pointer" : "default",
            fontSize: size,
            lineHeight: 1,
            color: n <= value ? t.accent : t.border,
          }}
        >
          {n <= value ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}
