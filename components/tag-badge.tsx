import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface TagBadgeProps {
  slug: string
  name: string
  count?: number
  active?: boolean
}

export function TagBadge({ slug, name, count, active }: TagBadgeProps) {
  return (
    <Link href={`/tags/${slug}`}>
      <Badge
        variant={active ? 'default' : 'outline'}
        className="cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        {name}
        {count !== undefined && (
          <span className="ml-1 text-muted-foreground">{count}</span>
        )}
      </Badge>
    </Link>
  )
}
