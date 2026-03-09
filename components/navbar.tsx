"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, GitCommit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileDrawer } from "@/components/mobile-drawer";
import { CommandSearch } from "@/components/command-search";
import { useState } from "react";

export type NavbarPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/tags", label: "Tags" },
  { href: "/about", label: "Sobre" },
];

interface NavbarProps {
  posts?: NavbarPost[];
}

export function Navbar({ posts = [] }: NavbarProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
        <Link
          href="/"
          className="mr-6 flex items-center gap-2 font-semibold text-foreground transition-opacity hover:opacity-80"
        >
          <GitCommit className="size-5" />
          <span className="font-mono text-sm tracking-tight">commitlog</span>
        </Link>

        <nav
          className="hidden items-center gap-0.5 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <CommandSearch posts={posts} />
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </header>
  );
}
