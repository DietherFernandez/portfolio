import { metadata } from "./metadata";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-text uppercase mono">
          Application Not Found
        </h1>
        <p className="text-sm text-secondary">
          The requested application does not exist in the system.
        </p>
      </div>
      <Link
        href="/projects"
        className="os-button"
      >
        BACK TO APPLICATIONS
      </Link>
    </div>
  );
}

import Link from "next/link";
