"use client";

import React, { useState, useEffect } from "react";

const BOOT_SEQUENCE = [
  { text: "BIOS v1.0.4-stable", delay: 300 },
  { text: "Checking system memory...", delay: 600 },
  { text: "Memory OK: 16384MB", delay: 400 },
  { text: "Loading kernel...", delay: 800 },
  { text: "Mounting /dev/portfolio...", delay: 500 },
  { text: "Initializing UI modules...", delay: 400 },
  { text: "Auth verified. Session active.", delay: 600 },
  { text: "System Ready.", delay: 200 },
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    let currentLine = 0;

    const runSequence = async () => {
      while (currentLine < BOOT_SEQUENCE.length) {
        const { text, delay } = BOOT_SEQUENCE[currentLine];
        setLines((prev) => [...prev, text]);
        await new Promise((resolve) => setTimeout(resolve, delay));
        currentLine++;
      }
      setIsComplete(true);
      setTimeout(onComplete, 500);
    };

    runSequence();
  }, [onComplete, hasMounted]);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col justify-center px-6 md:px-20 font-mono text-xs md:text-sm transition-opacity duration-1000 overflow-hidden">
      <div className="space-y-1 max-w-3xl">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-3 text-text/80">
            <span className="text-accent opacity-50">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
            <span>{line}</span>
          </div>
        ))}
        {!isComplete && (
          <div className="flex items-center gap-1 text-accent">
            <span>_</span>
            <div className="w-2 h-4 bg-accent animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
