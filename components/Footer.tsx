"use client";

import { config } from "@/lib/config";

export default function Footer() {
  return (
    <footer
      className="relative z-10 w-full text-center px-6 py-10 flex flex-col items-center gap-2"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <p
        className="font-mono"
        style={{ fontSize: "0.65rem", letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase" }}
      >
        {config.footer.line1}
      </p>
      <p
        className="font-mono"
        style={{ fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--muted)", opacity: 0.5 }}
      >
        {config.footer.line2}
      </p>
      <div
        className="flex items-center gap-2 mt-1"
        style={{ opacity: 0.3 }}
      >
        {["◆", "◇", "◆"].map((s, i) => (
          <span key={i} className="text-accent" style={{ fontSize: "0.4rem" }}>
            {s}
          </span>
        ))}
      </div>
    </footer>
  );
}
