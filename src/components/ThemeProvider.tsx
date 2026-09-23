"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  triggerTransition: (x: number, y: number, nextTheme: "dark" | "light") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);
  const [transition, setTransition] = useState<{
    isActive: boolean;
    x: number;
    y: number;
    color: string;
  }>({
    isActive: false,
    x: 0,
    y: 0,
    color: "var(--background)",
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("diether-os-theme") as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setThemeState("light");
    } else {
      setThemeState("dark");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    let actualTheme = theme;
    if (theme === "system") {
      actualTheme = window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    root.setAttribute("data-theme", actualTheme);
    localStorage.setItem("diether-os-theme", theme);
  }, [theme, mounted]);

  const triggerTransition = async (x: number, y: number, nextTheme: "dark" | "light") => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !document.startViewTransition) {
      setThemeState(nextTheme);
      return;
    }

    const transition = document.startViewTransition(() => {
      setThemeState(nextTheme);
    });

    await transition.ready;

    document.documentElement.style.setProperty("--x", `${x}px`);
    document.documentElement.style.setProperty("--y", `${y}px`);

    document.documentElement.classList.add("theme-transitioning");
  };

  useEffect(() => {
    if (document.documentElement.classList.contains("theme-transitioning")) {
      document.documentElement.classList.remove("theme-transitioning");
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, triggerTransition }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
