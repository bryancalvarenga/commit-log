'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import type { Reaction, ReactionType } from '@/types'
import { cn } from '@/lib/utils'
import { ThumbsUp, Heart, Flame } from 'lucide-react'

interface ReactionBarProps {
  reactions: Reaction[]
  postId: string
}

const reactionConfig: Record<ReactionType, { icon: typeof ThumbsUp; label: string }> = {
  like: { icon: ThumbsUp, label: 'Curtir' },
  love: { icon: Heart, label: 'Amar' },
  fire: { icon: Flame, label: 'Fogo' },
}

export function ReactionBar({ reactions: initialReactions, postId }: ReactionBarProps) {
  const { user } = useAuth()
  const [reactions, setReactions] = useState(initialReactions)

  const handleReaction = async (type: ReactionType) => {
    if (!user) return

    setReactions((prev) =>
      prev.map((r) => {
        if (r.postId === postId && r.type === type) {
          const toggled = !r.viewerHasReacted
          return {
            ...r,
            viewerHasReacted: toggled,
            count: toggled ? r.count + 1 : r.count - 1,
          }
        }
        return r
      })
    )
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
        <div className="flex gap-2">
          {reactions.map((r) => {
            const config = reactionConfig[r.type]
            const Icon = config.icon
            return (
              <div key={r.type} className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm text-muted-foreground">
                <Icon className="size-4" />
                <span>{r.count}</span>
              </div>
            )
          })}
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/login">Login para reagir</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {reactions.map((r) => {
        const config = reactionConfig[r.type]
        const Icon = config.icon
        return (
          <button
            key={r.type}
            onClick={() => handleReaction(r.type)}
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors',
              r.viewerHasReacted
                ? 'border-ring bg-accent text-accent-foreground'
                : 'border-border text-muted-foreground hover:border-ring hover:text-foreground'
            )}
            aria-label={`${config.label} (${r.count})`}
          >
            <Icon className="size-4" />
            <span>{r.count}</span>
          </button>
        )
      })}
    </div>
  )
}
