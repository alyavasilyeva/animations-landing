import { Code2, MousePointerClick, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const highlights = [
  {
    icon: Sparkles,
    title: "Motion experiments",
    body: "Entrance timing, springs, reduced-motion variants, and interaction feedback.",
  },
  {
    icon: Code2,
    title: "CSS craft",
    body: "Layout, theming, and visual polish built with Tailwind and custom styles.",
  },
  {
    icon: MousePointerClick,
    title: "Interactive UI",
    body: "Menus, drawers, and transitions you can click through — not a live product.",
  },
] as const

const WELCOME_SEEN_KEY = "welcome-popup-seen"

export default function WelcomePopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      if (window.localStorage.getItem(WELCOME_SEEN_KEY) === "1") return
      window.localStorage.setItem(WELCOME_SEEN_KEY, "1")
      setOpen(true)
    } catch {
      // Private mode / blocked storage — still greet once this session
      setOpen(true)
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton
        className="welcome-popup gap-0 overflow-hidden border-border/80 p-0 sm:max-w-md"
        aria-describedby="welcome-popup-description"
      >
        <div className="welcome-popup-accent" aria-hidden />

        <div className="relative space-y-5 px-6 pt-6 pb-2">
          <DialogHeader className="gap-3">
            <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">
              Portfolio note
            </p>
            <DialogTitle className="text-2xl leading-tight font-semibold tracking-tight text-foreground">
              Welcome on my testing website ✨
            </DialogTitle>
            <DialogDescription
              id="welcome-popup-description"
              className="text-[15px] leading-relaxed text-muted-foreground"
            >
              This site is a sandbox for testing CSS and motion animations. It
              is not a real product. It is a personal project, always WIP. It is
              a way to test my skills and to learn new things, such as:
            </DialogDescription>
          </DialogHeader>

          <ul className="space-y-3">
            {highlights.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="text-sm leading-snug text-muted-foreground">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
