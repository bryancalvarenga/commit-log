import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Post } from '@/types'

interface PostNavigationProps {
  previous: Post | null
  next: Post | null
}

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null

  return (
    <nav className="flex flex-col gap-3 sm:flex-row sm:justify-between" aria-label="Navegacao entre posts">
      {previous ? (
        <Link
          href={`/posts/${previous.slug}`}
          className="group flex flex-1 items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-ring/40 hover:bg-secondary/50"
        >
          <ArrowLeft className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Anterior</p>
            <p className="truncate text-sm font-medium text-foreground">{previous.title}</p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={`/posts/${next.slug}`}
          className="group flex flex-1 items-center justify-end gap-3 rounded-lg border bg-card p-4 text-right transition-colors hover:border-ring/40 hover:bg-secondary/50"
        >
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Proximo</p>
            <p className="truncate text-sm font-medium text-foreground">{next.title}</p>
          </div>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}
