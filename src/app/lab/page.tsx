import { labItems } from "@/data/lab";

export default function LabPage() {
  return (
    <div className="space-y-12 py-8">
      <header className="space-y-2 pt-2">
        <h1 className="text-2xl font-bold tracking-tight text-text uppercase mono">
          Lab
        </h1>
        <p className="text-sm text-secondary">
          Experiments & technical explorations.
        </p>
      </header>

      <div className="space-y-6">
        {labItems.map((item, index) => (
          <div key={item.id} className="os-card group hover:border-accent/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="text-lg font-bold mono text-muted group-hover:text-accent transition-colors">
                [{String(index + 1).padStart(2, '0')}]
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-text uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-secondary leading-relaxed max-w-xl">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.technologies.map(tech => (
                    <span key={tech} className="text-[10px] mono px-1.5 py-0.5 rounded bg-border text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="w-1 h-1 rounded-full bg-accent" />
              <span className="text-[10px] mono text-secondary uppercase tracking-wider">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {labItems.length === 0 && (
        <div className="os-card border-dashed flex flex-col items-center justify-center py-12 text-center space-y-2">
          <p className="text-sm text-secondary">More experiments will appear here as they develop.</p>
          <p className="text-xs mono text-muted">awaiting_input.bin</p>
        </div>
      )}
    </div>
  );
}
