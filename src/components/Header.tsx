import { ChevronLeft, ChevronRight, Menu, Wallet, X } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react"
import { useEffect, useState } from "react"
import useMeasure from "react-use-measure"
import { Drawer } from "vaul"
import ThemeToggle from "./ThemeToggle"
import { Button } from "./ui/button"
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./ui/menubar"

const NAV_ITEMS = [
  {
    label: "Menu",
    items: [
      {
        label: "Features",
        isChild: true,
        items: [
          { label: "Send & receive", isChild: true },
          { label: "Swap tokens", isChild: true },
          { label: "Portfolio tracker", isChild: true },
          {
            label: "Security",
            isChild: true,
            items: [
              { label: "Recovery phrase", isChild: true },
              { label: "Biometrics", isChild: true },
              { label: "Hardware keys", isChild: true },
            ],
          },
        ],
      },
      {
        label: "Learn",
        isChild: true,
        items: [
          { label: "Getting started", isChild: true },
          { label: "Guides", isChild: true },
          {
            label: "Resources",
            items: [
              { label: "Docs", isChild: true },
              { label: "Blog", isChild: true },
              { label: "FAQ", isChild: true },
            ],
            isChild: true,
          },
        ],
      },
    ],
    isChild: false,
  },
]

type NavLeaf = { label: string; items?: NavLeaf[]; isChild: boolean }

function MobileNavPanelContent({
  navLeaf,
  onBack,
  onPush,
}: {
  navLeaf: NavLeaf
  onBack: () => void
  onPush: (entry: NavLeaf) => void
}) {
  const isPresent = useIsPresent()

  return (
    <div
      className="w-full"
      style={{ pointerEvents: isPresent ? "auto" : "none" }}
    >
      {navLeaf.isChild ? (
        <button
          type="button"
          onClick={onBack}
          className="mb-1 flex w-full items-center gap-1 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 ease"
        >
          <ChevronLeft className="size-4" />
          <span className="font-medium text-foreground">{navLeaf.label}</span>
        </button>
      ) : null}

      <ul className="flex max-h-[min(50vh,24rem)] flex-col overflow-y-auto overscroll-contain">
        {navLeaf.items?.map((entry) =>
          entry.items?.length ? (
            <li
              key={entry.label}
              className="border-b border-border/40 last:border-b-0"
            >
              <button
                type="button"
                onClick={() => onPush(entry)}
                className="flex w-full items-center justify-between py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 ease"
              >
                {entry.label}
                <ChevronRight className="size-4" />
              </button>
            </li>
          ) : (
            <li
              key={entry.label}
              className="border-b border-border/40 last:border-b-0"
            >
              <button
                type="button"
                className="w-full py-2.5 text-left text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 ease"
              >
                {entry.label}
              </button>
            </li>
          ),
        )}
      </ul>
    </div>
  )
}

function MobileNav() {
  const [stack, setStack] = useState<NavLeaf[]>(NAV_ITEMS)
  const [direction, setDirection] = useState(1)
  const [ref, bounds] = useMeasure()
  const shouldReduceMotion = useReducedMotion()

  const current = stack[stack.length - 1]

  const push = (entry: NavLeaf) => {
    setDirection(1)
    setStack((prev) => [...prev, entry])
  }

  const pop = () => {
    if (stack.length <= 1) return
    setDirection(-1)
    setStack((prev) => prev.slice(0, -1))
  }

  return (
    <div className="relative grid overflow-hidden">
      <motion.div
        animate={{ height: bounds.height }}
        className="multi-step-wrapper"
      >
        <div className="multi-step-inner" ref={ref}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current.label}
              custom={direction}
              variants={{
                enter: (dir: number) =>
                  shouldReduceMotion
                    ? { x: 0, opacity: 0 }
                    : { x: `${dir * 100}%`, opacity: 0 },
                center: { x: 0, opacity: 1 },
                exit: (dir: number) =>
                  shouldReduceMotion
                    ? { x: 0, opacity: 0 }
                    : { x: `${dir * -100}%`, opacity: 0 },
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      x: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
                      opacity: { duration: 0.25, ease: "easeOut" },
                    }
              }
              className="col-start-1 row-start-1 w-full"
            >
              <MobileNavPanelContent
                navLeaf={current}
                onBack={pop}
                onPush={push}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

function DesktopNav() {
  return (
    <Menubar className="hidden md:flex h-auto border-0 bg-transparent p-0 shadow-none gap-1">
      {NAV_ITEMS[0].items?.map((menu) => (
        <MenubarMenu key={menu.label}>
          <MenubarTrigger className="rounded-lg px-3 py-1.5 text-sm font-normal text-muted-foreground data-[state=open]:text-foreground focus:text-foreground">
            {menu.label}
          </MenubarTrigger>
          <MenubarContent className="min-w-48 rounded-xl">
            <MenubarGroup>
              {menu.items.map((entry) =>
                entry.items ? (
                  <MenubarSub key={entry.label}>
                    <MenubarSubTrigger>{entry.label}</MenubarSubTrigger>
                    <MenubarSubContent className="rounded-xl">
                      <MenubarGroup>
                        {entry.items?.map((child: NavLeaf) => (
                          <MenubarItem key={child.label}>
                            {child.label}
                          </MenubarItem>
                        ))}
                      </MenubarGroup>
                    </MenubarSubContent>
                  </MenubarSub>
                ) : (
                  <MenubarItem key={entry.label}>{entry.label}</MenubarItem>
                ),
              )}
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)")
    const onChange = () => {
      if (media.matches) {
        setMobileMenuOpen(false)
      }
    }

    media.addEventListener("change", onChange)
    return () => {
      media.removeEventListener("change", onChange)
    }
  }, [])

  return (
    <header className="relative z-50 border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}
          >
            <Wallet className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            WALLET
            <span style={{ color: "#8b5cf6" }}>.</span>
          </span>
        </div>

        {/* Desktop nav */}
        <DesktopNav />

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button
            type="button"
            variant="outline"
            className="text-sm px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground transition-colors hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign in
          </Button>
          <Button
            type="button"
            className="text-sm px-5 py-2 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}
          >
            Get wallet
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Drawer.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <Drawer.Trigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="rounded-xl text-muted-foreground hover:text-foreground"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40 md:hidden" />
              <Drawer.Content
                className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-border/50 bg-card outline-none md:hidden"
                aria-describedby={undefined}
              >
                <div
                  className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-muted-foreground/25"
                  aria-hidden
                />
                <div className="px-5 pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
                  <Drawer.Title className="sr-only">Menu</Drawer.Title>
                  <nav>
                    <MobileNav />
                  </nav>
                  <div className="flex gap-3 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 text-sm py-2.5 rounded-xl text-muted-foreground border border-border"
                    >
                      Sign in
                    </Button>
                    <Button
                      type="button"
                      className="flex-1 text-sm py-2.5 rounded-xl font-semibold text-white"
                      style={{
                        background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                      }}
                    >
                      Get wallet
                    </Button>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  )
}
