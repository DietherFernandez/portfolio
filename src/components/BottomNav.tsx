"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderKanban,
  User,
  Mail,
  FlaskConical
} from "lucide-react";

const MOBILE_NAV_ITEMS = [
  { name: "HOME", href: "/", icon: Home },
  { name: "PROJECTS", href: "/projects", icon: FolderKanban },
  { name: "LAB", href: "/lab", icon: FlaskConical },
  { name: "ABOUT", href: "/about", icon: User },
  { name: "CONTACT", href: "/contact", icon: Mail },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 h-16 w-[95vw] max-w-lg border border-border bg-surface/80 backdrop-blur-lg rounded-full flex items-center justify-between px-8 z-50 shadow-2xl">
      {MOBILE_NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`relative flex flex-col items-center justify-center h-full w-full transition-all duration-200 group pt-2 active:scale-95 ${
              isActive
                ? "text-accent"
                : "text-text"
            } ${item.name === "LAB" ? "-translate-y-4" : ""}`}
          >
            {isActive && (
              <div className="absolute -top-1 w-1 h-1 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
            )}
            <div className={`flex items-center justify-center rounded-full transition-all duration-300 ${
              item.name === "LAB"
                ? `p-3 shadow-[0_0_15px_rgba(201,107,34,0.4)] ${isActive ? "bg-orange-400" : "bg-[#c96b22]"}`
                : "bg-border/20 border border-border/30 p-2 group-active:bg-border/40"
            }`}>
              <item.icon className={`transition-all duration-300 ${
                item.name === "LAB"
                  ? "w-8 h-8"
                  : "w-6 h-6"
              } ${
                isActive
                  ? "text-accent scale-110"
                  : "text-text group-active:scale-90"
              }`} />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-tighter mt-0 transition-opacity duration-300 ${
              isActive ? "text-accent opacity-100" : "text-text opacity-60"
            }`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
