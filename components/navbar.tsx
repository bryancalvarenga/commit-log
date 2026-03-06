'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, GitCommit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { MobileDrawer } from '@/components/mobile-drawer'
import { CommandSearch } from '@/components/command-search'
import { useAuth } from '@/lib/auth-context'
import { useState } from 'react'
import type { Post } from '@/types'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Posts' },
  { href: '/tags', label: 'Tags' },
  { href: '/about', label: 'Sobre' },
]

interface NavbarProps {
  posts?: Post[]
}

export function Navbar({ posts = [] }: NavbarProps) {
  const pathname = usePathname()
  const { user } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
        <Link href="/" className="mr-6 flex items-center gap-2 font-semibold text-foreground transition-opacity hover:opacity-80">
          <GitCommit className="size-5" />
          <span className="font-mono text-sm tracking-tight">commit.log</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <CommandSearch posts={posts} />
          <ThemeToggle />
          <div className="hidden md:flex">
            {user ? (
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                <Link href="/me">{user.name}</Link>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
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
  )
}
