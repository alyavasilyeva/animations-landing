import { Cpu, ExternalLink, Key, Lock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const securityPoints = [
  {
    icon: Key,
    label: "Non-custodial",
    desc: "Private keys never leave your device. We cannot access your funds.",
  },
  {
    icon: Shield,
    label: "Audited contracts",
    desc: "All integrated protocols pass independent security review before listing.",
  },
  {
    icon: Lock,
    label: "Biometric auth",
    desc: "FaceID, TouchID, and hardware key support for every critical action.",
  },
  {
    icon: Cpu,
    label: "Secure enclave",
    desc: "Keys are encrypted at rest using your device's secure hardware element.",
  },
]

export default function Security() {
  return (
    <section
      className="relative z-10 py-24 lg:py-32 border-y border-border/40"
      style={{
        background:
          "linear-gradient(180deg, rgba(13,13,26,0.8) 0%, rgba(7,7,15,0.9) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          <div>
            <div
              className="inline-block text-xs font-mono font-semibold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full border"
              style={{
                color: "#10b981",
                borderColor: "rgba(16,185,129,0.3)",
                background: "rgba(16,185,129,0.08)",
              }}
            >
              Security-first
            </div>
            <h2
              className="text-4xl lg:text-5xl font-black tracking-tight mb-5"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Your assets are yours.
              <br />
              <span style={{ color: "#a78bfa" }}>Always.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              WALLET is non-custodial by design. Your private keys are encrypted
              locally and never transmitted to our servers — we couldn't access
              your funds even if we wanted to.
            </p>
            <Button
              type="button"
              variant="outline"
              className="rounded-xl h-auto px-5 py-3 border-[rgba(139,92,246,0.3)] text-[#a78bfa] hover:border-primary/50 hover:text-foreground bg-transparent"
            >
              Read our security whitepaper
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {securityPoints.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="p-5 rounded-2xl border transition-all hover:border-primary/30"
                style={{
                  background: "rgba(13,13,26,0.8)",
                  borderColor: "rgba(139,92,246,0.1)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.2)",
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#10b981" }} />
                </div>
                <h4 className="font-bold mb-1.5">{label}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
