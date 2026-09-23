"use client";

import React, { useEffect, useState } from "react";

export default function WorkspaceBackground() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      setOffset({
        x: (e.clientX - centerX) * 0.01,
        y: (e.clientY - centerY) * 0.01,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Interactive Geometry Layer */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        {/* Subtle Gradient Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-surface opacity-50" />

        {/* Large soft circle top-right */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-border/30 bg-accent/5 blur-3xl"
          style={{ transform: 'translate(20%, -20%)' }}
        />

        {/* Large soft circle bottom-left */}
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full border border-border/20 bg-border/5 blur-3xl"
          style={{ transform: 'translate(-10%, 10%)' }}
        />

        {/* Subtle geometric angle top-left */}
        <div
          className="absolute top-20 left-10 w-64 h-64 border-l border-t border-border/20 rounded-tl-3xl"
          style={{ transform: 'rotate(15deg) translate(-20px, -20px)' }}
        />

        {/* Subtle geometric line bottom-right */}
        <div
          className="absolute bottom-40 right-[-50px] w-80 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent"
          style={{ transform: 'rotate(-10deg)' }}
        />

        {/* Faint Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(var(--border) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
    </div>
  );
}
