'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import type { Comment } from '@/types'
import { MessageSquare, Trash2 } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'

const SHORT_MONTHS = [
  'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
  'jul', 'ago', 'set', 'out', 'nov', 'dez',
]

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getUTCDate()} ${SHORT_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

interface CommentSectionProps {
  comments: Comment[]
  postId: string
}

export function CommentSection({ comments: initialComments, postId }: CommentSectionProps) {
  const { user } = useAuth()
  const [comments, setComments] = useState(initialComments)
  const [body, setBody] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isAdmin = !!user && user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !body.trim() || isSubmitting) return

    try {
      setIsSubmitting(true)
      setError(null)

      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content: body.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Erro ao criar comentário')
      }

      const newComment = await res.json()

      setComments((prev) => [...prev, newComment])
      setBody('')
    } catch (err) {
      console.error(err)
      setError('Não foi possível enviar o comentário.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (commentId: string) => {
    if (!user || deletingId) return

    try {
      setDeletingId(commentId)
      setError(null)

      const res = await fetch(`/api/comments/delete/${commentId}`, {
        method: 'POST',
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Erro ao excluir comentário')
      }

      setComments((prev) => prev.filter((comment) => comment.id !== commentId))
    } catch (err) {
      console.error(err)
      setError('Não foi possível excluir o comentário.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquare className="size-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">
          {comments.length} {comments.length === 1 ? 'comentário' : 'comentários'}
        </h2>
      </div>

      <Separator />

      {!user ? (
        <div className="rounded-lg border bg-card p-6 text-center">
          <p className="mb-4 text-sm text-muted-foreground">
            Faça login para comentar
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login com GitHub</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login com email</Link>
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Avatar className="mt-1 size-8 shrink-0">
            <AvatarImage src={user.image ?? undefined} alt={user.name ?? 'Usuário'} />
            <AvatarFallback>{user.name?.[0] ?? 'U'}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1 space-y-3">
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Escreva um comentário..."
              className="min-h-20 resize-none"
              disabled={isSubmitting}
            />

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <div className="flex justify-end">
              <Button type="submit" size="sm" disabled={!body.trim() || isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Comentar'}
              </Button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {comments.length === 0 && (
          <EmptyState
            title="Nenhum comentário ainda."
            description="Seja o primeiro a comentar neste post."
            icon={<MessageSquare className="size-6" />}
          />
        )}

        {comments.map((comment, i) => {
          const canDelete = !!user && (comment.author.id === user.id || isAdmin)

          return (
            <div key={comment.id}>
              <div className="flex gap-3">
                <Avatar className="mt-1 size-8 shrink-0 border">
                  <AvatarImage
                    src={comment.author.image ?? undefined}
                    alt={comment.author.name ?? 'Usuário'}
                  />
                  <AvatarFallback>{comment.author.name?.[0] ?? 'U'}</AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="rounded-lg border bg-card p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {comment.author.name ?? 'Usuário'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatShortDate(comment.createdAt)}
                        </span>
                      </div>

                      {canDelete && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(comment.id)}
                          disabled={deletingId === comment.id}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>

                    <p className="text-sm leading-relaxed text-foreground">
                      {comment.body}
                    </p>
                  </div>
                </div>
              </div>

              {i < comments.length - 1 && <Separator className="ml-11 mt-4" />}
            </div>
          )
        })}
      </div>
    </section>
  )
}