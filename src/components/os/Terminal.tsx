"use client";

import React, { useState, useEffect, useRef } from "react";
import { useOSStore } from "@/store/useOSStore";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

export default function Terminal() {
  const {
    isTerminalOpen,
    toggleTerminal,
    terminalHistory,
    addToTerminalHistory,
    clearTerminalHistory,
    openWindow
  } = useOSStore();

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      addToTerminalHistory("input", cmd);

      if (cmd === "help") {
        addToTerminalHistory("output", "Available commands: help, clear, ls, open <app>, whoami, date");
      } else if (cmd === "clear") {
        clearTerminalHistory();
      } else if (cmd === "ls") {
        addToTerminalHistory("output", "projects/  lab/  about.txt  contact.sh");
      } else if (cmd === "whoami") {
        addToTerminalHistory("output", "diether_fernandez (admin)");
      } else if (cmd === "date") {
        addToTerminalHistory("output", new Date().toString());
      } else if (cmd.startsWith("open ")) {
        const app = cmd.split(" ")[1];
        if (app === "projects") {
          openWindow("projects", "Project Explorer");
          addToTerminalHistory("output", "Opening projects...");
        } else if (app === "lab") {
          openWindow("lab", "The Lab");
          addToTerminalHistory("output", "Opening lab...");
        } else {
          addToTerminalHistory("output", `Error: App '${app}' not found.`);
        }
      } else if (cmd === "") {
        // Do nothing
      } else {
        addToTerminalHistory("output", `Command not found: ${cmd}. Type 'help' for assistance.`);
      }

      setInput("");
    }
  };

  if (!isTerminalOpen) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      className="fixed bottom-0 left-0 right-0 h-1/3 z-[120] bg-background border-t border-border shadow-2xl font-mono text-xs md:text-sm overflow-hidden flex flex-col"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-border/30 border-b border-border">
        <div className="flex items-center gap-2 text-text/60">
          <TerminalIcon className="w-3 h-3" />
          <span className="uppercase tracking-tighter">System Terminal v1.0.4</span>
        </div>
        <button
          onClick={toggleTerminal}
          className="text-text/40 hover:text-text transition-colors"
        >
          ✕
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide"
      >
        {terminalHistory.map((line, i) => (
          <div key={i} className="flex gap-2">
            {line.type === "input" ? (
              <>
                <span className="text-accent font-bold">➜</span>
                <span className="text-text">{line.content}</span>
              </>
            ) : (
              <span className="text-text/80">{line.content}</span>
            )}
          </div>
        ))}
        <div className="flex gap-2">
          <span className="text-accent font-bold">➜</span>
          <input
            autoFocus
            className="flex-1 bg-transparent outline-none text-text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
          />
        </div>
      </div>
    </motion.div>
  );
}
