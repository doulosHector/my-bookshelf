// Design tokens: graphite, steel and bronze.
export const THEMES = {
  light: {
    bg: "#E6E7E3",
    surface: "#F4F4F1",
    ink: "#16181A",
    muted: "#5D6167",
    border: "#CFD1CC",
    accent: "#1E4E5F",
    accentSoft: "#DBE3E6",
    onAccent: "#F4F4F1",
    shadow: "0 1px 2px rgba(22,24,26,0.08), 0 6px 20px rgba(22,24,26,0.06)",
  },
  dark: {
    bg: "#101215",
    surface: "#191C20",
    ink: "#E4E5E2",
    muted: "#8B9096",
    border: "#272B30",
    accent: "#7FADBD",
    accentSoft: "#1C272D",
    onAccent: "#101215",
    shadow: "0 1px 2px rgba(0,0,0,0.5), 0 6px 20px rgba(0,0,0,0.35)",
  },
};

export const THEME_MODES = Object.keys(THEMES);

export const DEFAULT_THEME = "light";

// Muted, earthy colors used for the book spines.
export const SPINE_COLORS = [
  "#3E5A6B",
  "#7A3B32",
  "#4F5B3C",
  "#8A6A34",
  "#40474F",
  "#5B4A63",
  "#2F6560",
  "#6B4B39",
];

export const NEUTRAL_SPINE_COLOR = "#6E7378";
