import { ChevronLeft, ChevronRight, Menu, Wallet, X } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import useMeasure from "react-use-measure"
import { Drawer } from "vaul"
import { HEADER_LINKS } from "@/lib/site-links"
import ThemeToggle from "./ThemeToggle"
import { Button } from "./ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu"

type NavLeaf = {
  label: string
  href?: string
  items?: NavLeaf[]
  isChild: boolean
}

const NAV_ITEMS: NavLeaf[] = [
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
              { label: "FAQ", isChild: true },
            ],
            isChild: true,
          },
        ],
      },
      ...HEADER_LINKS.map((link) => ({
        label: link.label,
        href: link.href,
        isChild: true,
      })),
    ],
    isChild: false,
  },
]

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
          className="mb-1 flex w-full items-center gap-1 py-2 text-sm text-muted-foreground hover:text-foreground transition-[color] duration-150 ease"
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
                className="flex w-full items-center justify-between py-2.5 text-sm text-foreground/85 hover:text-foreground transition-[color] duration-150 ease"
              >
                {entry.label}
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            </li>
          ) : (
            <li
              key={entry.label}
              className="border-b border-border/40 last:border-b-0"
            >
              <a
                href={entry.href ?? "#"}
                className="block w-full py-2.5 text-left text-sm text-foreground/85 hover:text-foreground transition-[color] duration-150 ease"
              >
                {entry.label}
              </a>
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

  const panelEase = [0.32, 0.72, 0, 1] as const
  const panelDuration = 0.25

  return (
    <div className="relative grid overflow-hidden">
      <motion.div
        animate={{ height: bounds.height || "auto" }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: panelDuration, ease: panelEase }
        }
        className="multi-step-wrapper overflow-hidden"
      >
        <div className="multi-step-inner" ref={ref}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current.label}
              custom={direction}
              variants={{
                enter: (dir: number) =>
                  shouldReduceMotion
                    ? { transform: "translate3d(0,0,0)", opacity: 0 }
                    : {
                        transform: `translate3d(${dir * 100}%,0,0)`,
                        opacity: 0,
                      },
                center: { transform: "translate3d(0,0,0)", opacity: 1 },
                exit: (dir: number) =>
                  shouldReduceMotion
                    ? { transform: "translate3d(0,0,0)", opacity: 0 }
                    : {
                        transform: `translate3d(${dir * -100}%,0,0)`,
                        opacity: 0,
                      },
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={
                shouldReduceMotion
                  ? { opacity: { duration: 0.15, ease: "easeOut" } }
                  : {
                      transform: { duration: panelDuration, ease: panelEase },
                      opacity: { duration: panelDuration, ease: "easeOut" },
                    }
              }
              className="col-start-1 row-start-1 w-full will-change-transform"
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
  const rootRef = useRef<HTMLElement | null>(null)
  const [value, setValue] = useState("")
  const [viewportX, setViewportX] = useState(0)

  const syncViewportToTrigger = useCallback((nextValue: string) => {
    const root = rootRef.current
    if (!root || !nextValue) return

    const trigger = root.querySelector<HTMLElement>(
      `[data-slot="navigation-menu-item"][data-value="${CSS.escape(nextValue)}"] [data-slot="navigation-menu-trigger"]`,
    )

    if (!trigger) return

    const rootRect = root.getBoundingClientRect()
    const triggerRect = trigger.getBoundingClientRect()
    setViewportX(triggerRect.left - rootRect.left)
  }, [])

  const handleValueChange = (nextValue: string) => {
    setValue(nextValue)
    if (nextValue) syncViewportToTrigger(nextValue)
  }

  useLayoutEffect(() => {
    if (value) syncViewportToTrigger(value)
  }, [value, syncViewportToTrigger])

  useEffect(() => {
    const onResize = () => {
      if (value) syncViewportToTrigger(value)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [value, syncViewportToTrigger])

  const linkClassName =
    "rounded-lg px-2 py-1.5 text-foreground/85 hover:bg-primary/15 hover:text-foreground focus:bg-primary/15 focus:text-foreground data-[active=true]:bg-primary/15 data-[active=true]:text-foreground data-[active=true]:hover:bg-primary/15 data-[active=true]:focus:bg-primary/15"

  return (
    <NavigationMenu
      ref={rootRef}
      value={value}
      onValueChange={handleValueChange}
      className="hidden lg:flex"
      delayDuration={120}
      skipDelayDuration={300}
      viewportClassName="border-border/80 shadow-lg shadow-black/40"
      viewportStyle={{ transform: `translate3d(${viewportX}px, 0, 0)` }}
    >
      <NavigationMenuList>
        {NAV_ITEMS[0]?.items
          ?.filter((menu): menu is NavLeaf & { items: NavLeaf[] } =>
            Boolean(menu.items?.length),
          )
          .map((menu) => (
            <NavigationMenuItem
              key={menu.label}
              value={menu.label}
              data-value={menu.label}
            >
              <NavigationMenuTrigger
                onPointerEnter={() => syncViewportToTrigger(menu.label)}
                className="h-auto rounded-lg bg-transparent px-3 py-1.5 text-sm font-normal text-foreground/70 shadow-none hover:bg-transparent hover:text-foreground focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent"
              >
                {menu.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-52 gap-0.5 p-1">
                  {menu.items?.map((entry) =>
                    entry.items?.length ? (
                      <li key={entry.label} className="grid gap-0.5">
                        <div className="px-2 pt-2 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                          {entry.label}
                        </div>
                        {entry.items.map((child) => (
                          <NavigationMenuLink
                            key={child.label}
                            href={child.href ?? "#"}
                            className={linkClassName}
                          >
                            {child.label}
                          </NavigationMenuLink>
                        ))}
                      </li>
                    ) : (
                      <li key={entry.label}>
                        <NavigationMenuLink
                          href={entry.href ?? "#"}
                          className={linkClassName}
                        >
                          {entry.label}
                        </NavigationMenuLink>
                      </li>
                    ),
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        {HEADER_LINKS.map((link) => (
          <NavigationMenuItem key={link.label}>
            <NavigationMenuLink
              href={link.href}
              className="inline-flex h-auto items-center rounded-lg bg-transparent px-3 py-1.5 text-sm font-normal text-foreground/70 no-underline hover:bg-transparent hover:text-foreground focus:bg-transparent"
            >
              {link.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)")
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
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
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

        {/* Desktop nav — lg+ so iPad portrait keeps the drawer */}
        <DesktopNav />

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <Button
            type="button"
            variant="outline"
            className="text-sm px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground transition-[transform] duration-150 ease [@media(hover:hover)]:hover:scale-[1.02] active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
          >
            Sign in
          </Button>
          <Button
            type="button"
            className="text-sm px-5 py-2 rounded-xl font-semibold text-white transition-[opacity,transform] duration-150 ease hover:opacity-90 [@media(hover:hover)]:hover:scale-[1.02] active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}
          >
            Get wallet
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-2 shrink-0">
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
              <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40 lg:hidden" />
              <Drawer.Content
                className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-border/50 bg-card outline-none lg:hidden"
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
