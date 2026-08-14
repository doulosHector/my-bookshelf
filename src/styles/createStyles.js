/**
 * Builds the shared inline styles from the active theme tokens.
 * @param {object} t theme tokens
 */
export function createStyles(t) {
  const input = {
    width: "100%",
    boxSizing: "border-box",
    background: t.bg,
    color: t.ink,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    padding: "10px 12px",
    fontSize: 15,
    fontFamily: "inherit",
    outline: "none",
  };

  return {
    input,
    label: {
      fontSize: 11,
      fontWeight: 700,
      color: t.muted,
      letterSpacing: "0.09em",
      textTransform: "uppercase",
      display: "block",
      marginBottom: 6,
    },
    btnPrimary: {
      background: t.accent,
      color: t.onAccent,
      border: "none",
      borderRadius: 6,
      padding: "11px 20px",
      fontSize: 15,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit",
    },
    btnGhost: {
      background: "transparent",
      color: t.muted,
      border: `1px solid ${t.border}`,
      borderRadius: 6,
      padding: "10px 16px",
      fontSize: 14,
      cursor: "pointer",
      fontFamily: "inherit",
    },
    card: {
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      boxShadow: t.shadow,
    },
    page: {
      maxWidth: 860,
      margin: "0 auto",
    },
  };
}
