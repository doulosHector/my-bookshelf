import { useTheme } from "../../hooks/useTheme";
import { SORT_LABELS, SORT_MODES } from "../../constants/shelf";

const OTHER_MODE = {
  [SORT_MODES.reading]: SORT_MODES.title,
  [SORT_MODES.title]: SORT_MODES.reading,
};

/** One button that swaps between the two orders the shelf supports. */
export function ShelfSort({ sort, onToggle }) {
  const { t, styles } = useTheme();
  const next = OTHER_MODE[sort];

  return (
    <button
      type="button"
      onClick={onToggle}
      title={`Ordenar por ${SORT_LABELS[next]}`}
      aria-label={`Orden actual: ${SORT_LABELS[sort]}. Cambiar a ${SORT_LABELS[next]}.`}
      style={{
        ...styles.btnGhost,
        color: t.ink,
        display: "inline-flex",
        gap: 7,
        alignItems: "center",
      }}
    >
      <span style={{ color: t.muted }}>Orden:</span>
      {SORT_LABELS[sort]}
      <span aria-hidden="true" style={{ color: t.muted }}>
        ⇅
      </span>
    </button>
  );
}
