import { useCallback, useEffect, useMemo } from "react";
import { ThemeContext } from "./ThemeContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { createStyles } from "../styles/createStyles";
import { DEFAULT_THEME, THEMES } from "../constants/theme";
import { STORAGE_KEYS } from "../constants/storage";

/** Keeps the CSS custom properties in sync so global stylesheets can theme too. */
function syncDocumentTheme(theme, tokens) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.setProperty("color-scheme", theme);
  root.style.setProperty("--color-bg", tokens.bg);
  root.style.setProperty("--color-surface", tokens.surface);
  root.style.setProperty("--color-ink", tokens.ink);
  root.style.setProperty("--color-muted", tokens.muted);
  root.style.setProperty("--color-border", tokens.border);
  root.style.setProperty("--color-accent", tokens.accent);

  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", tokens.bg);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.theme, DEFAULT_THEME);
  const tokens = THEMES[theme] ?? THEMES[DEFAULT_THEME];

  useEffect(() => {
    syncDocumentTheme(theme, tokens);
  }, [theme, tokens]);

  const toggleTheme = useCallback(
    () => setTheme((current) => (current === "light" ? "dark" : "light")),
    [setTheme],
  );

  const value = useMemo(
    () => ({ theme, t: tokens, styles: createStyles(tokens), toggleTheme }),
    [theme, tokens, toggleTheme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
