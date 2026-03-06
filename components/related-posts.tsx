import Link from 'next/link'
import type { Post } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'

interface RelatedPostsProps {
  posts: Post[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Posts relacionados
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {posts.slice(0, 4).map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="group rounded-lg border bg-card p-4 transition-colors hover:border-ring/40 hover:bg-secondary/50"
          >
            <h4 className="mb-1.5 text-sm font-medium leading-snug text-foreground text-balance group-hover:text-accent-foreground transition-colors">
              {post.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3" />
              <span>{post.readingTime} min</span>
              <span className="text-border">|</span>
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="px-1.5 py-0 text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
