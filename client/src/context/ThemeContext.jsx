import React, { createContext, useContext, useEffect, useState } from "react";
import { THEME_CONFIG } from "../config/theme";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_CONFIG.STORAGE_KEY) || THEME_CONFIG.SYSTEM;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(THEME_CONFIG.LIGHT, THEME_CONFIG.DARK);

    if (theme === THEME_CONFIG.SYSTEM) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? THEME_CONFIG.DARK
        : THEME_CONFIG.LIGHT;
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(THEME_CONFIG.STORAGE_KEY, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
