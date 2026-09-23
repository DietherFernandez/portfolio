import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText, Monitor } from "lucide-react";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-12 py-6 transition-opacity duration-300 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <header className="space-y-6">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-xs text-secondary hover:text-accent transition-colors group"
        >
          <ArrowLeft className="w-3 h-3 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="mono uppercase tracking-wider">Back to Applications</span>
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs mono text-muted">0{projects.indexOf(project) + 1}</span>
            <div className="h-px flex-1 bg-border" />
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent/10 border border-accent/20">
              <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] mono text-accent font-bold uppercase">{project.status}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text uppercase">
            {project.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-secondary">{project.category}</span>
            <div className="flex gap-2">
              {project.technologies.map(tech => (
                <span key={tech} className="text-[10px] mono px-1.5 py-0.5 rounded bg-border text-muted">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <p className="text-muted leading-relaxed max-w-3xl text-sm md:text-base">
            {project.description}
          </p>
        </div>
      </header>

      {/* Overview Section */}
      <section className="space-y-4">
        <h3 className="text-xs mono text-muted uppercase tracking-widest border-b border-border pb-2">
          Project Overview
        </h3>
        <div className="os-card space-y-4">
          <p className="text-sm text-secondary leading-relaxed">
            {project.longDescription}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-4">
        <h3 className="text-xs mono text-muted uppercase tracking-widest border-b border-border pb-2">
          Implemented Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {project.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-os border border-border bg-surface/50 transition-colors hover:border-accent/30">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
              <span className="text-sm text-secondary">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="space-y-4">
        <h3 className="text-xs mono text-muted uppercase tracking-widest border-b border-border pb-2">
          Screenshots
        </h3>
        <div className="os-card aspect-video flex flex-col items-center justify-center text-center space-y-3 border-dashed bg-transparent">
          <div className="p-3 rounded-full bg-border">
            <Monitor className="w-6 h-6 text-muted" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-secondary">Project visuals will be added here</p>
            <p className="text-xs text-muted mono">awaiting_assets.bin</p>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="space-y-4 pb-12">
        <h3 className="text-xs mono text-muted uppercase tracking-widest border-b border-border pb-2">
          External Links
        </h3>
        <div className="flex flex-wrap gap-3">
          {project.links?.live && (
            <Link href={project.links.live} className="os-button flex items-center gap-2">
              <ExternalLink className="w-3 h-3" /> Live Demo
            </Link>
          )}
          {project.links?.repo && (
            <Link href={project.links.repo} className="os-button flex items-center gap-2">
              <span className="w-3 h-3 bg-text rounded-full" /> Source Code
            </Link>
          )}
          {!project.links?.live && !project.links?.repo && (
            <p className="text-xs text-muted italic">No external links configured for this project.</p>
          )}
        </div>
      </section>
    </div>
  );
}
