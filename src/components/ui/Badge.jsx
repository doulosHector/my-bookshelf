export function Badge({ text, color }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        color,
        border: `1px solid ${color}55`,
        borderRadius: 3,
        padding: "2px 6px",
      }}
    >
      {text}
    </span>
  );
}
