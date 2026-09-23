"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { useOSStore } from "@/store/useOSStore";
import Window from "./Window";

interface AppContent {
  id: string;
  title: string;
  component: React.ReactNode;
}

export default function WindowManager({ children }: { children: React.ReactNode }) {
  const { openWindows } = useOSStore();

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {openWindows.map((window) => (
          <div key={window.id} className="pointer-events-auto">
            <Window id={window.id} title={window.title}>
              {/*
                  In a real OS we'd map the window ID to a specific component.
                  For now, we'll handle the content rendering at the page level
                  or pass it through a registry.
              */}
              <div className="text-muted">
                Content for {window.title} is managed by the Page components.
              </div>
            </Window>
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
