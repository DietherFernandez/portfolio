"use client";

import Link from "next/link";
import { Project } from "@/data/projects";
import { ExternalLink, ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div className="os-card group hover:border-accent/50 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden hover:shadow-sm interactive">
      <div className="absolute top-0 right-0 p-2">
        <span className="text-[10px] mono text-muted opacity-50 group-hover:text-accent transition-colors">
          0{index + 1}
        </span>
      </div>

      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-text tracking-tight group-hover:text-accent transition-colors">
            {project.name}
          </h4>
          <p className="text-xs text-secondary font-medium">{project.category}</p>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent/10 border border-accent/20">
          <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
          <span className="text-[9px] mono text-accent font-bold uppercase">{project.status}</span>
        </div>
      </div>

      <p className="text-xs text-muted leading-relaxed line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map(tech => (
          <span key={tech} className="text-[10px] mono px-1.5 py-0.5 rounded bg-border text-muted transition-colors group-hover:bg-border/80">
            {tech}
          </span>
        ))}
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="os-button text-center w-full py-1.5 text-xs flex items-center justify-center gap-2 group/btn"
      >
        OPEN PROJECT
        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </Link>
    </div>
  );
}
