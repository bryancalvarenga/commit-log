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
  const [loadingType, setLoadingType] = useState<ReactionType | null>(null)
  const [error, setError] = useState('')

  const handleReaction = async (type: ReactionType) => {
    if (!user || loadingType) return

    try {
      setLoadingType(type)
      setError('')

      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          userId: user.id,
          type,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Erro ao registrar reação')
      }

      const updatedReaction = await response.json()

      setReactions((prev) => {
        const exists = prev.some((r) => r.type === type)

        if (!exists) {
          return [
            ...prev,
            {
              postId: updatedReaction.postId,
              type: updatedReaction.type,
              count: updatedReaction.count,
              viewerHasReacted: updatedReaction.viewerHasReacted,
            },
          ]
        }

        return prev.map((r) =>
          r.type === type
            ? {
                ...r,
                count: updatedReaction.count,
                viewerHasReacted: updatedReaction.viewerHasReacted,
              }
            : r
        )
      })
    } catch (err) {
      console.error(err)
      setError('Nao foi possivel registrar a reacao.')
    } finally {
      setLoadingType(null)
    }
  }

  if (!user) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
          <div className="flex gap-2">
            {reactions.map((r) => {
              const config = reactionConfig[r.type]
              const Icon = config.icon

              return (
                <div
                  key={r.type}
                  className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm text-muted-foreground"
                >
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

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {reactions.map((r) => {
          const config = reactionConfig[r.type]
          const Icon = config.icon
          const isLoading = loadingType === r.type

          return (
            <button
              key={r.type}
              onClick={() => handleReaction(r.type)}
              disabled={!!loadingType}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60',
                r.viewerHasReacted
                  ? 'border-ring bg-accent text-accent-foreground'
                  : 'border-border text-muted-foreground hover:border-ring hover:text-foreground'
              )}
              aria-label={`${config.label} (${r.count})`}
            >
              <Icon className="size-4" />
              <span>{isLoading ? '...' : r.count}</span>
            </button>
          )
        })}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}