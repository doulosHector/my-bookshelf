export function ThemeIcon({ dark }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{
        display: "block",
        transform: dark ? "rotate(180deg)" : "none",
        transition: "transform 0.3s ease",
      }}
    >
      <circle cx="8" cy="8" r="6.75" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 1.25 A6.75 6.75 0 0 1 8 14.75 Z" fill="currentColor" />
    </svg>
  );
}
