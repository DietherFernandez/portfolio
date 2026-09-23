"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Command } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "OVERVIEW", href: "/" },
  { name: "PROJECTS", href: "/projects" },
  { name: "LAB", href: "/lab" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredItems = NAV_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    router.push(href);
    setIsOpen(false);
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-start justify-center pt-24 px-4 bg-background/60 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-surface border border-border rounded-os shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Command className="w-4 h-4 text-muted" />
          <input
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-text font-mono text-sm"
            placeholder="Search system..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="text-[10px] mono text-muted px-2 py-1 border border-border rounded bg-background">
            ESC to close
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.href}
                onClick={() => handleSelect(item.href)}
                className={`flex items-center justify-between px-3 py-2 rounded-sm cursor-pointer transition-colors ${
                  pathname === item.href
                    ? "bg-accent/20 text-accent"
                    : "text-secondary hover:bg-border/50 hover:text-text"
                }`}
              >
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-[10px] mono opacity-50">{item.href}</span>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-muted text-sm">
              No system matches found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
