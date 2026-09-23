"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  iconUrl?: string;
}

export default function ThemeToggle({ iconUrl = "/icons/dark-theme.svg" }: ThemeToggleProps) {
  const { theme, setTheme, triggerTransition } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-4 h-4" />;

  const getEffectiveTheme = () => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    return theme;
  };

  const currentEffectiveTheme = getEffectiveTheme();

  // Use light.svg when the current theme is light, otherwise use the provided iconUrl (dark)
  const activeIcon = currentEffectiveTheme === "light" ? "/icons/light.svg" : iconUrl;

  const handleToggle = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const nextTheme = currentEffectiveTheme === "dark" ? "light" : "dark";

    setIsSpinning(true);
    triggerTransition(x, y, nextTheme);

    setTimeout(() => {
      setIsSpinning(false);
    }, 600);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative flex items-center justify-center text-text focus:outline-none"
      aria-label={`Switch to ${currentEffectiveTheme === "dark" ? "light" : "dark"} theme`}
    >
      <div className={`theme-spin-trigger ${isSpinning ? "theme-spin-active" : ""}`}>
        <span
          className="social-icon relative z-10 transition-transform duration-100 active:scale-90"
          aria-hidden="true"
          style={{ "--icon-url": `url('${activeIcon}')` } as React.CSSProperties}
        />
      </div>
    </button>
  );
}