import { ChevronDown, Menu, Wallet, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Drawer } from "vaul"
import { cn } from "@/lib/utils"
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
    label: "Features",
    items: [
      { label: "Send & receive" },
      { label: "Swap tokens" },
      { label: "Portfolio tracker" },
      {
        label: "Security",
        items: [
          { label: "Recovery phrase" },
          { label: "Biometrics" },
          { label: "Hardware keys" },
        ],
      },
    ],
  },
  {
    label: "Learn",
    items: [
      { label: "Getting started" },
      { label: "Guides" },
      {
        label: "Resources",
        items: [{ label: "Docs" }, { label: "Blog" }, { label: "FAQ" }],
      },
    ],
  },
] as const

type NavLeaf = { label: string; items?: undefined }
type NavBranch = { label: string; items: readonly NavLeaf[] }
type NavEntry = NavLeaf | NavBranch

function isNavBranch(entry: NavEntry): entry is NavBranch {
  return "items" in entry && entry.items !== undefined
}

function MobileNavSection({
  label,
  items,
}: {
  label: string
  items: readonly NavEntry[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 ease"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200 ease-out",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-1 pb-3 pl-1">
            {items.map((entry) =>
              isNavBranch(entry) ? (
                <li key={entry.label}>
                  <p className="px-2 pt-1 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                    {entry.label}
                  </p>
                  <ul className="flex flex-col">
                    {entry.items.map((child) => (
                      <li key={child.label}>
                        <button
                          type="button"
                          className="w-full rounded-lg px-2 py-2 text-left text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors duration-150 ease"
                        >
                          {child.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={entry.label}>
                  <button
                    type="button"
                    className="w-full rounded-lg px-2 py-2 text-left text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors duration-150 ease"
                  >
                    {entry.label}
                  </button>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
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
        <Menubar className="hidden md:flex h-auto border-0 bg-transparent p-0 shadow-none gap-1">
          {NAV_ITEMS.map((menu) => (
            <MenubarMenu key={menu.label}>
              <MenubarTrigger className="rounded-lg px-3 py-1.5 text-sm font-normal text-muted-foreground data-[state=open]:text-foreground focus:text-foreground">
                {menu.label}
              </MenubarTrigger>
              <MenubarContent className="min-w-48 rounded-xl">
                <MenubarGroup>
                  {menu.items.map((entry) =>
                    isNavBranch(entry) ? (
                      <MenubarSub key={entry.label}>
                        <MenubarSubTrigger>{entry.label}</MenubarSubTrigger>
                        <MenubarSubContent className="rounded-xl">
                          <MenubarGroup>
                            {entry.items.map((child) => (
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
                  <nav className="flex flex-col">
                    {NAV_ITEMS.map((menu) => (
                      <MobileNavSection
                        key={menu.label}
                        label={menu.label}
                        items={menu.items}
                      />
                    ))}
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
