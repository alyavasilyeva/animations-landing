import { Wallet } from "lucide-react"
import { SITE_LINKS } from "@/lib/site-links"

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40 py-12">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-6">
          <div className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
              }}
            >
              <Wallet className="w-3.5 h-3.5 text-white" />
            </div>
            <span
              className="font-bold tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              WALLET<span style={{ color: "#8b5cf6" }}>.</span>
            </span>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-muted-foreground max-w-md lg:max-w-none"
          >
            {SITE_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="hover:text-foreground transition-[color] whitespace-nowrap"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="text-xs text-muted-foreground font-mono shrink-0 text-center lg:text-right">
            © 2025 Nova Labs, Inc.
          </div>
        </div>
      </div>
    </footer>
  )
}
