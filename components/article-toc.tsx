'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { List } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TocItem {
  id: string
  text: string
  level: number
}

interface ArticleTOCProps {
  items: TocItem[]
}

export function ArticleTOC({ items }: ArticleTOCProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <>
      {/* Desktop TOC */}
      <nav className="hidden xl:block" aria-label="Table of Contents">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Neste artigo
        </p>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={cn(
                  'block border-l-2 py-1 text-xs transition-colors',
                  item.level === 3 ? 'pl-6' : 'pl-3',
                  activeId === item.id
                    ? 'border-ring text-foreground font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile TOC */}
      <div className="xl:hidden">
        <Button
          variant="outline"
          size="sm"
          className="mb-4 w-full justify-start gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <List className="size-4" />
          {isOpen ? 'Esconder' : 'Mostrar'} sumario
        </Button>
        {isOpen && (
          <nav className="mb-6 rounded-md border bg-card p-4" aria-label="Table of Contents">
            <ul className="space-y-1.5">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                      setIsOpen(false)
                    }}
                    className={cn(
                      'block text-sm transition-colors',
                      item.level === 3 ? 'pl-4' : '',
                      activeId === item.id
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  )
}

export function extractTocItems(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const items: TocItem[] = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
    items.push({ id, text, level })
  }

  return items
}
