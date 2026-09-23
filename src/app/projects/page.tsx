import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export default function ProjectsPage() {
  return (
    <div className="space-y-12 py-8">
      <header className="space-y-2 pt-2">
        <h1 className="text-2xl font-bold tracking-tight text-text uppercase mono">
          Applications
        </h1>
        <p className="text-sm text-secondary">
          Projects I have built.
        </p>
      </header>


      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "Systems", "Websites"].map((filter) => (
          <button
            key={filter}
            className={`px-3 py-1 rounded-os text-[10px] mono transition-colors ${
              filter === "All"
                ? "bg-accent text-background"
                : "bg-border text-muted hover:text-text"
            }`}
          >
            {filter.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
