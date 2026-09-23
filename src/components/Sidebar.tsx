"use client";

import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FlaskConical,
  User,
  Mail,
  Activity,
  Cpu,
  Database
} from "lucide-react";
import { socials } from "@/data/socials";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { name: "OVERVIEW", href: "/", icon: LayoutDashboard },
  { name: "PROJECTS", href: "/projects", icon: FolderKanban },
  { name: "LAB", href: "/lab", icon: FlaskConical },
  { name: "ABOUT", href: "/about", icon: User },
  { name: "CONTACT", href: "/contact", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [metrics, setMetrics] = useState({ cpu: 0, mem: 0 });

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics({
        cpu: Math.floor(Math.random() * (8 - 2 + 1)) + 2,
        mem: parseFloat((Math.random() * (2.5 - 1.2) + 1.2).toFixed(1)),
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="hidden md:flex flex-col w-[320px] h-full border-r border-sb-border bg-sb-bg transition-colors duration-300">
      {/* TOP: Profile Section */}
      <div className="p-6 space-y-4">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative w-20 h-20 rounded-os overflow-hidden group">
            <img
              src="/picture/profile.png"
              alt="Diether Fernandez"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.nextElementSibling) {
                  (target.nextElementSibling as HTMLElement).style.display = 'flex';
                }
              }}
            />
            <div
              className="absolute inset-0 hidden items-center justify-center bg-border text-text font-bold text-xl"
              style={{ display: 'none' }} // Controlled by onError fallback
            >
              DF
            </div>
          </div>

          <div className="space-y-1 text-center">
            <h3 className="text-sm font-bold text-sb-text tracking-tight leading-tight">
              Diether Fernandez
            </h3>
            <p className="text-[10px] mono text-sb-text-muted">
              diether.fernandez82@gmail.com
            </p>
          </div>
        </div>

        {/* Control Row: Socials + Theme */}
        <div className="flex justify-center items-center gap-2 pt-2">
          {socials.github && (
            <Link
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-sb-border text-sb-icon hover:text-accent hover:border-accent/50 transition-all duration-200 group"
              aria-label="GitHub"
              title="GitHub"
            >
              <span
                className="social-icon"
                aria-hidden="true"
                style={{ "--icon-url": "url('/icons/github-logo.svg')" } as React.CSSProperties}
              />
            </Link>
          )}
          {socials.facebook && (
            <Link
              href={socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-secondary hover:text-accent hover:border-accent/50 transition-all duration-200 group"
              aria-label="Facebook"
              title="Facebook"
            >
              <span
                className="social-icon"
                aria-hidden="true"
                style={{ "--icon-url": "url('/icons/facebook.svg')" } as React.CSSProperties}
              />
            </Link>
          )}
          {socials.discord && (
            <Link
              href={socials.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-secondary hover:text-accent hover:border-accent/50 transition-all duration-200 group"
              aria-label="Discord"
              title="Discord"
            >
              <span
                className="social-icon"
                aria-hidden="true"
                style={{ "--icon-url": "url('/icons/discord.svg')" } as React.CSSProperties}
              />
            </Link>
          )}
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-secondary hover:text-accent hover:border-accent/50 transition-all duration-200 group">
            <div className="transition-transform duration-200 group-hover:scale-105">
              <ThemeToggle
                iconUrl="/icons/dark-mode.svg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE: Navigation */}
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Fragment key={item.name}>
              {item.name === "PROJECTS" && (
                <div className="h-px w-full bg-border my-4" />
              )}
              <Link
                href={item.href}
                className={`flex items-center gap-3 pl-6 pr-3 py-2 rounded-os transition-all duration-200 group ${
                  isActive
                    ? "text-accent bg-accent/10 shadow-sm"
                    : "text-secondary hover:text-text hover:bg-border/50"
                }`}
              >
                <item.icon className={`w-5 h-5 transition-all duration-200 ${isActive ? "text-accent" : "group-hover:text-text group-hover:scale-105 group-hover:-translate-x-[3px]"}`} />
                <span className="text-[15px] font-medium tracking-wide">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1 h-1 rounded-full bg-accent shadow-[0_0_4px_var(--accent)]" />
                )}
              </Link>
            </Fragment>
          );
        })}
      </nav>

      {/* BOTTOM: System Controls */}
      <div className="p-6 border-t border-border space-y-4">
        <div className="pt-2 space-y-2">
          <div className="flex items-center gap-2 text-[10px] mono text-muted uppercase tracking-widest opacity-60">
            <Activity className="w-3 h-3 text-accent" />
            <span>Status</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] mono text-secondary">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="uppercase">Online</span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
            <div className="flex items-center gap-2 text-[10px] mono text-muted">
              <Cpu className="w-3 h-3 text-accent/60" />
              <span>CPU: {metrics.cpu}%</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] mono text-muted">
              <Database className="w-3 h-3 text-accent/60" />
              <span>MEM: {metrics.mem}GB</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] mono text-muted pt-1">
            <span className="uppercase">Version 1.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
