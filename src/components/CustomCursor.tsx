"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);

  // targetPos is where the mouse actually is
  const targetPos = useRef({ x: 0, y: 0 });
  // currentPos is where the circle is visually rendered (interpolated)
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, input, textarea, select, [role='button'], .interactive, .os-card") ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    let animationFrameId: number;
    const updatePosition = () => {
      // Subtle interpolation for smooth follow
      // 0.15 - 0.2 range provides a natural, responsive delay without feeling laggy
      const easing = 0.18;

      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * easing;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * easing;

      if (cursorRef.current) {
        // POSITIONING:
        // 1. Set left/top to the current interpolated position
        // 2. Use translate(-50%, -50%) to keep the center exactly on those coordinates
        cursorRef.current.style.left = `${currentPos.current.x}px`;
        cursorRef.current.style.top = `${currentPos.current.y}px`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[999999] border transition-[width,height,border-color,opacity] duration-200 ease-out ${
        isHovering
          ? "border-accent opacity-60 outline outline-1 outline-black"
          : "border-text/30 opacity-100"
      }`}
      style={{
        // Use dynamic width/height for the scale effect to avoid transform conflicts
        width: isHovering ? '48px' : '32px',
        height: isHovering ? '48px' : '32px',
        left: 0,
        top: 0,
        margin: 0,
        padding: 0,
        transform: 'translate(-50%, -50%)',
        position: 'fixed',
        willChange: 'left, top',
        borderRadius: '9999px',
      }}
    />
  );
}
