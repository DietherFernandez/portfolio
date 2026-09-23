"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function WorkspaceBackground() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      setOffset({
        x: (e.clientX - centerX) * 0.01,
        y: (e.clientY - centerY) * 0.01,
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Only trigger ripple if the click is on the background or empty space
      // We check if the target is a button, link, or inside an interactive element
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.os-button') ||
        target.closest('.os-card') ||
        target.closest('nav') ||
        target.closest('aside')
      ) {
        return;
      }

      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: e.pageX, y: e.pageY }]);

      // Remove ripple after animation finishes (1s)
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Water Ripple Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute rounded-full border border-accent/30 bg-accent/5"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: "100px",
                height: "100px",
                marginLeft: "-50px",
                marginTop: "-50px",
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Interactive Geometry Layer */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        {/* Subtle Gradient Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-surface opacity-50" />

        {/* Floating Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-border/10 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-surface/20 blur-3xl animate-blob animation-delay-4000" />

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
