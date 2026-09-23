"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { projects } from "@/data/projects";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  const pathname = usePathname();
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getBreadcrumbs = () => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const trail = ["root"];

    pathSegments.forEach((segment) => {
      if (segment === "projects") {
        trail.push("projects");
      } else if (pathname.startsWith("/projects/")) {
        const project = projects.find((p) => p.slug === segment);
        trail.push(project ? project.name : segment);
      } else {
        trail.push(segment);
      }
    });

    return trail;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-12 border-b border-transparent bg-transparent flex items-center justify-between px-4 z-40 pt-8 sm:pt-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {/* Mobile Profile Photo */}
          <div className="sm:hidden relative w-16 h-16 rounded-full border border-border overflow-hidden bg-card shrink-0">
            <img
              src="/icons/profile.png"
              alt="Diether Fernandez"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Name and Role */}
          <div className="sm:hidden flex flex-col justify-center">
            <span className="text-sm font-bold text-text leading-tight">
              Diether Fernandez
            </span>
            <span className="text-[10px] mono text-muted leading-tight">
              diether.fernandez82@gmail.com
            </span>
            <span className="text-[10px] mono text-muted uppercase tracking-widest leading-tight">
              Developer • Creator
            </span>
          </div>

          <span className="hidden text-xs font-bold tracking-tighter text-text uppercase mono">
            DIETHER OS
          </span>
        </div>

        <div className="hidden items-center gap-2 text-[10px] mono text-muted opacity-60">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              <span className={i === breadcrumbs.length - 1 ? "text-accent font-bold" : ""}>
                {crumb}
              </span>
              {i < breadcrumbs.length - 1 && (
                <span className="text-border">&gt;</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Mobile Theme Toggle */}
        <div className="sm:hidden flex items-center justify-center w-16 h-16 rounded-full border-transparent text-secondary transition-all duration-200 group active:scale-95">
          <div className="transition-transform duration-200 group-active:scale-105">
            <ThemeToggle
              iconUrl="/icons/dark-mode.svg"
            />
          </div>
        </div>

        <div className="hidden items-center gap-2 text-[10px] mono text-secondary uppercase tracking-wider">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="mr-2">Online</span>
          <span className="text-muted">
            {mounted ? time.toLocaleTimeString([], { hour12: false }) : ''}
          </span>
        </div>
      </div>
    </header>
  );
}
