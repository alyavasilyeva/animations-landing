import { Wallet } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40 py-12">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
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

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {[
              "Privacy",
              "Terms",
              "Developers",
              "Bug Bounty",
              "Status",
              "Blog",
            ].map((l) => (
              <a
                key={l}
                href={`/`}
                className="hover:text-foreground transition-colors"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="text-xs text-muted-foreground font-mono">
            © 2025 Nova Labs, Inc.
          </div>
        </div>
      </div>
    </footer>
  )
}
