"use client";

import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import CustomCursor from "../components/CustomCursor";
import WorkspaceBackground from "../components/WorkspaceBackground";
import BootSequence from "../components/BootSequence";
import CommandPalette from "../components/CommandPalette";
import KeyboardShortcuts from "../components/KeyboardShortcuts";
import { useState, useEffect } from "react";
import { useOSStore } from "@/store/useOSStore";
import WindowManager from "../components/os/WindowManager";
import Terminal from "../components/os/Terminal";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasBooted, setHasBooted] = useState<boolean | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    const booted = sessionStorage.getItem("os-booted");
    if (booted) {
      setHasBooted(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?") {
        e.preventDefault();
        setShowShortcuts((prev) => !prev);
      }

      // OS Shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === "t") {
        e.preventDefault();
        e.stopPropagation();
        useOSStore.getState().toggleTerminal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleBootComplete = () => {
    setHasBooted(true);
    sessionStorage.setItem("os-booted", "true");
  };

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/icons/favicon.svg" />
          <title>Diether Fernandez | Portfolio</title>
        </head>
        <body className="antialiased">
          <ThemeProvider>
            {!hasBooted && (
              <BootSequence onComplete={handleBootComplete} />
            )}

            <div className={`flex h-screen w-full overflow-hidden bg-background text-text transition-opacity duration-700 ${hasBooted ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <div className="flex flex-col flex-1 h-full relative">
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />
                  <main className="flex-1 overflow-y-auto relative p-4 md:p-8 pb-24 md:pb-8 bg-surface/30">
                    <div className="flex flex-col h-full relative">
                      <TopBar />
                      <div className="absolute inset-0 z-0">
                        <WorkspaceBackground />
                      </div>
                      <div className="relative z-10 max-w-5xl mx-auto w-full">
                        {children}
                      </div>
                    </div>
                  </main>
                </div>
                <BottomNav />
              </div>
              <div className="hidden md:block">
                <CustomCursor />
              </div>
            </div>
            <WindowManager />
            <Terminal />
            <CommandPalette />
            <KeyboardShortcuts isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
          </ThemeProvider>
        </body>
      </html
>
    </>
  );
}
