import { projects } from "@/data/projects";
import Link from "next/link";
import { Code2, Cpu, Globe, Layout, Smartphone, Database } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-12 py-8">
      <header className="space-y-4 pt-2">
        <h1 className="text-2xl font-bold tracking-tight text-text uppercase mono">
          About
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
            DIETHER FERNANDEZ
          </h2>
          <p className="text-lg font-medium text-secondary">
            Developer / Builder
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/assets/DIETHER_FERNANDEZ_Resume.txt"
              download
              className="os-button os-button-primary inline-flex items-center gap-2"
            >
              DOWNLOAD CV
            </a>
          </div>
        </div>
        <p className="text-muted max-w-2xl leading-relaxed">
          I build practical software and digital systems. I focus on creating tools that solve real problems,
          prioritizing stability, utility, and clear interfaces over unnecessary decoration.
        </p>
      </header>

      <section className="space-y-6">
        <h3 className="text-xs mono text-muted uppercase tracking-widest border-b border-border pb-2">
          Profile
        </h3>
        <div className="os-card space-y-4">
          <p className="text-sm text-secondary leading-relaxed">
            I am a developer driven by the desire to build systems that actually work for the people using them.
            Whether it is a management system for a local business or a specialized tool for digital workflows,
            my goal is to create software that is reliable, maintainable, and focused on the task at hand.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xs mono text-muted uppercase tracking-widest border-b border-border pb-2">
          What I Build
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Web Applications", desc: "Complex, database-backed systems for business operations.", icon: Globe },
            { title: "Management Systems", desc: "Specialized tools for rentals, inventories, and services.", icon: Database },
            { title: "Desktop Software", desc: "Applications that bridge the gap between web and local OS.", icon: Monitor },
            { title: "Business Websites", desc: "Clean, professional digital presences for local enterprises.", icon: Layout },
          ].map((item, i) => (
            <div key={i} className="os-card flex items-start gap-4">
              <div className="p-2 rounded-os bg-border text-text">
                <item.icon className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-text">{item.title}</h4>
                <p className="text-xs text-secondary">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xs mono text-muted uppercase tracking-widest border-b border-border pb-2">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-3">
          {["Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase", "Electron", "Git"].map(tech => (
            <span key={tech} className="os-button py-1 px-3 text-[11px] mono text-secondary">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xs mono text-muted uppercase tracking-widest border-b border-border pb-2">
          Development Philosophy
        </h3>
        <div className="os-card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Real Workflows", desc: "Software should adapt to the user's actual process, not the other way around." },
              { title: "Utility First", desc: "Functionality and reliability are more important than visual trends." },
              { title: "Maintainable Code", desc: "Build systems that can be easily understood and updated over time." },
              { title: "Iterative Improvement", desc: "Ship useful versions early and refine based on actual usage." },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <h4 className="text-xs font-bold text-text uppercase mono">{item.title}</h4>
                <p className="text-xs text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6 pb-12">
        <h3 className="text-xs mono text-muted uppercase tracking-widest border-b border-border pb-2">
          Selected Work
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.slice(0, 2).map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="os-card group hover:border-accent/50 transition-colors p-4 flex items-center justify-between"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-text group-hover:text-accent transition-colors">{project.name}</h4>
                <p className="text-xs text-secondary">{project.category}</p>
              </div>
              <div className="text-accent mono text-xs">VIEW →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6 pb-12">
        <h3 className="text-xs mono text-muted uppercase tracking-widest border-b border-border pb-2">
          Let's Connect
        </h3>
        <div className="os-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-text">Ready to build something useful?</h4>
            <p className="text-xs text-secondary">Let's discuss your next project or collaboration idea.</p>
          </div>
          <Link
            href="/contact"
            className="os-button os-button-primary inline-flex items-center gap-2"
          >
            OPEN COMMUNICATIONS
          </Link>
        </div>
      </section>
    </div>
  );
}

import { Monitor } from "lucide-react";
