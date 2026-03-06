'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAuth } from '@/lib/auth-context'
import { GitCommit, Home, FileText, Tag, Info, User, LogIn } from 'lucide-react'

interface MobileDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/posts', label: 'Posts', icon: FileText },
  { href: '/tags', label: 'Tags', icon: Tag },
  { href: '/about', label: 'Sobre', icon: Info },
]

export function MobileDrawer({ open, onOpenChange }: MobileDrawerProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle className="flex items-center gap-2">
            <GitCommit className="size-5" />
            <span className="font-mono text-sm">commit.log</span>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col p-2" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            )
          })}

          <div className="my-2 border-t" />

          {user ? (
            <Link
              href="/me"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <User className="size-4" />
              {user.name}
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <LogIn className="size-4" />
              Login
            </Link>
          )}

          <div className="my-2 border-t" />

          <div className="flex items-center gap-2 px-3 py-2">
            <span className="text-sm text-muted-foreground">Tema</span>
            <ThemeToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
