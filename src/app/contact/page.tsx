import { contactData } from "@/data/contact";
import { Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="space-y-12 py-8 max-w-2xl">
      <header className="space-y-4 pt-2">
        <h1 className="text-2xl font-bold tracking-tight text-text uppercase mono">
          Contact
        </h1>
        <p className="text-lg font-medium text-secondary">
          Let's build something useful.
        </p>
        <p className="text-sm text-muted leading-relaxed">
          If you want to get in touch about a project, development work, collaboration, or an idea,
          you can reach me through the available channels below.
        </p>
      </header>

      <section className="space-y-6">
        <h3 className="text-xs mono text-muted uppercase tracking-widest border-b border-border pb-2">
          Contact Channels
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {contactData.github && (
            <Link
              href={contactData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="os-card flex items-center justify-between hover:border-accent/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-os bg-border text-text group-hover:text-accent transition-colors">
                  <div className="w-4 h-4 bg-text rounded-full" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-text">GitHub</h4>
                  <p className="text-xs text-secondary mono truncate">{contactData.github}</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
            </Link>
          )}

          {contactData.linkedin && (
            <Link
              href={contactData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="os-card flex items-center justify-between hover:border-accent/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-os bg-border text-text group-hover:text-accent transition-colors">
                  <div className="w-4 h-4 bg-text rounded-full" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-text">LinkedIn</h4>
                  <p className="text-xs text-secondary mono truncate">{contactData.linkedin}</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
            </Link>
          )}

          {contactData.twitter && (
            <Link
              href={contactData.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="os-card flex items-center justify-between hover:border-accent/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-os bg-border text-text group-hover:text-accent transition-colors">
                  <div className="w-4 h-4 bg-text rounded-full" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-text">Twitter / X</h4>
                  <p className="text-xs text-secondary mono truncate">{contactData.twitter}</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
            </Link>
          )}

          {contactData.email && (
            <Link
              href={`mailto:${contactData.email}`}
              className="os-card flex items-center justify-between hover:border-accent/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-os bg-border text-text group-hover:text-accent transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-text">Email</h4>
                  <p className="text-xs text-secondary mono truncate">{contactData.email}</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
