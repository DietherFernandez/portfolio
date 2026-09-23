"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export default function HomePage() {
  return (
    <div className="relative min-h-full space-y-12 py-6 transition-opacity duration-300 animate-in fade-in slide-in-from-bottom-2">
      {/* Background Geometry Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full border border-border/60" />
        <div className="absolute top-1/3 -left-48 h-[500px] w-[500px] rounded-full border border-border/40" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rotate-45 border border-border/30" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="space-y-6 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-text pt-6 sm:pt-0">
            BUILD. BREAK. REPEAT.
          </h1>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/projects"
              className="os-button os-button-primary inline-flex items-center gap-2"
            >
              VIEW PROJECTS
            </Link>
            <Link
              href="/lab"
              className="os-button inline-flex items-center gap-2"
            >
              OPEN LAB
            </Link>
            <a
              href="/resume.pdf"
              download="Diether_Fernandez_Resume.pdf"
              className="os-button inline-flex items-center gap-2"
            >
              DOWNLOAD CV
            </a>
          </div>
        </section>

        {/* System Overview Section */}
        <section className="space-y-4 pt-12">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs mono text-muted uppercase tracking-widest text-left">
              System Overview
            </h3>
            <span className="text-[9px] mono text-border/60 uppercase">proc_id: 0x4F2A // status: nominal</span>
          </div>
          <div className="flex overflow-x-auto pb-2 sm:grid sm:grid-cols-3 gap-4 snap-x justify-center">
            <div className="os-card flex flex-col justify-center items-center text-center space-y-1 group hover:border-accent/50 transition-colors min-w-[120px] snap-center">
              <span className="text-3xl font-bold text-text">{projects.length}</span>
              <span className="text-[10px] mono text-secondary uppercase">Projects</span>
            </div>
            <div className="os-card flex flex-col justify-center items-center text-center space-y-1 group hover:border-accent/50 transition-colors min-w-[120px] snap-center">
              <span className="text-3xl font-bold text-text">
                {projects.filter(p => p.status === 'ACTIVE DEVELOPMENT').length}
              </span>
              <span className="text-[10px] mono text-secondary uppercase">Active</span>
            </div>
            <div className="os-card flex flex-col justify-center items-center text-center space-y-1 group hover:border-accent/50 transition-colors min-w-[120px] snap-center">
              <span className="text-lg font-bold text-text truncate px-2">
                {projects[0]?.name}
              </span>
              <span className="text-[10px] mono text-secondary uppercase">Current Build</span>
            </div>
          </div>
        </section>

        {/* Recent Builds Section */}
        <section className="space-y-4 pt-12">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs mono text-muted uppercase tracking-widest">
              Recent Builds
            </h3>
            <span className="text-[9px] mono text-border/60 uppercase">cache_status: optimized // build_mode: release</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.slice(0, 2).map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
          <div className="flex justify-center pt-4">
            <Link
              href="/projects"
              className="text-xs mono text-secondary hover:text-accent transition-colors flex items-center gap-1"
            >
              VIEW ALL PROJECTS <span className="text-accent">→</span>
            </Link>
          </div>
        </section>

        {/* System Activity Section */}
        <section className="space-y-4 pb-16">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs mono text-muted uppercase tracking-widest">
              System Activity
            </h3>
            <span className="text-[9px] mono text-border/60 uppercase">log_level: verbose // stream: active</span>
          </div>
          <div className="os-card space-y-3 divide-y divide-border overflow-hidden">
            {[
              { time: "10:42", event: "NetDesk session system" },
              { time: "09:31", event: "Brgy Connect request workflow" },
              { time: "08:47", event: "Portfolio system initialized" },
            ].map((log, i) => (
              <div key={i} className="flex items-center gap-4 py-2 text-xs transition-colors hover:bg-border/30 px-2 -mx-2">
                <span className="mono text-muted w-12 shrink-0">{log.time}</span>
                <span className="text-secondary">{log.event}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
