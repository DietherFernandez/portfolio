"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Minus, Square } from "lucide-react";
import { useOSStore } from "@/store/useOSStore";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function Window({ id, title, children }: WindowProps) {
  const { closeWindow, focusWindow, focusedWindowId, openWindows } = useOSStore();
  const windowState = openWindows.find(w => w.id === id);

  if (!windowState) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      onMouseDown={() => focusWindow(id)}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      style={{ zIndex: windowState.zIndex }}
      className={`absolute min-w-[320px] max-w-[90vw] max-h-[80vh] rounded-os border border-border bg-surface shadow-2xl overflow-hidden flex flex-col ${
        focusedWindowId === id ? "ring-1 ring-accent/50" : "opacity-90"
      }`}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-border/50 cursor-grab active:cursor-grabbing border-b border-border select-none">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-text/70 uppercase tracking-wider">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-border rounded-sm transition-colors">
            <Minus className="w-3 h-3 text-muted" />
          </button>
          <button className="p-1 hover:bg-border rounded-sm transition-colors">
            <Square className="w-3 h-3 text-muted" />
          </button>
          <button
            onClick={() => closeWindow(id)}
            className="p-1 hover:bg-red-500 hover:text-white rounded-sm transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {children}
      </div>
    </motion.div>
  );
}
