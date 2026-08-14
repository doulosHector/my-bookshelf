import { createContext } from "react";

/** @type {import('react').Context<{theme: string, t: object, styles: object, toggleTheme: () => void} | null>} */
export const ThemeContext = createContext(null);
