"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const SHORTCUTS = [
  { key: "Home", description: "Go to home page" },
  { key: "P", description: "Go to projects" },
  { key: "L", description: "Go to lab" },
  { key: "A", description: "Go to about" },
  { key: "C", description: "Go to contact" },
  { key: "K", description: "Open command palette" },
  { key: "?", description: "Show keyboard shortcuts" },
  { key: "Esc", description: "Close dialogs" },
];

export default function KeyboardShortcuts({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-background/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface border border-border rounded-os shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="text-sm font-bold text-text mono uppercase tracking-wider">
            Keyboard Shortcuts
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-border text-muted hover:text-text transition-colors"
            aria-label="Close keyboard shortcuts"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
          {SHORTCUTS.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center justify-between px-3 py-2 rounded-os bg-border/30 hover:bg-border/50 transition-colors"
            >
              <span className="text-xs text-secondary">{shortcut.description}</span>
              <kbd className="text-[10px] mono px-2 py-1 rounded bg-background border border-border text-text">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-border">
          <p className="text-[10px] mono text-muted">
            Press <kbd className="px-1 py-0.5 rounded bg-background border border-border">?</kbd> to reopen this panel
          </p>
        </div>
      </div>
    </div>
  );
}