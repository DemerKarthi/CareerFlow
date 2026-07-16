import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { THEME_CONFIG } from '../../config/theme';
import { Button } from './button';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  const isDark = theme === THEME_CONFIG.DARK || 
    (theme === THEME_CONFIG.SYSTEM && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? THEME_CONFIG.LIGHT : THEME_CONFIG.DARK);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-slate-600 dark:text-slate-400 transition-transform duration-300 hover:scale-105"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
};
