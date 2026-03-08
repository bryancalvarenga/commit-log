import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Mail, MessageSquare, Shield } from 'lucide-react'

interface PageProps {
  params: Promise<{ username: string }>
}

export default async function PublicUserPage({ params }: PageProps) {
  const { username } = await params

  const user = await prisma.user.findFirst({
    where: { username },
    include: {
      comments: {
        include: {
          post: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      },
      reactions: true,
    },
  })

  if (!user) {
    notFound()
  }

  const isAdmin = user.email === process.env.ADMIN_EMAIL

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-lg border bg-card p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Avatar className="size-24 border">
            <AvatarImage src={user.image ?? undefined} alt={user.name ?? 'Usuário'} />
            <AvatarFallback className="text-2xl">
              {user.name?.[0] ?? 'U'}
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {user.name ?? 'Usuário'}
            </h1>

            {user.username && (
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            )}
          </div>

          <Badge variant={isAdmin ? 'default' : 'secondary'}>
            {isAdmin ? 'Administrador' : 'Leitor'}
          </Badge>
        </div>

        <Separator className="my-6" />

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-4 text-center">
            <p className="text-2xl font-semibold">{user.comments.length}</p>
            <p className="text-sm text-muted-foreground">Comentários recentes</p>
          </div>

          <div className="rounded-lg border p-4 text-center">
            <p className="text-2xl font-semibold">{user.reactions.length}</p>
            <p className="text-sm text-muted-foreground">Reações feitas</p>
          </div>

          <div className="rounded-lg border p-4 text-center">
            <p className="text-2xl font-semibold">
              {user.createdAt.toLocaleDateString('pt-BR')}
            </p>
            <p className="text-sm text-muted-foreground">Membro desde</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4 text-sm">
          {user.email && (
            <div className="flex items-center gap-3">
              <Mail className="size-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Shield className="size-4 text-muted-foreground" />
            <span>{isAdmin ? 'Administrador do blog' : 'Leitor e comentarista'}</span>
          </div>
        </div>

        <Separator className="my-6" />

        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-medium">
            <MessageSquare className="size-5" />
            Comentários recentes
          </h2>

          <div className="space-y-4">
            {user.comments.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Esse usuário ainda não comentou em nenhum post.
              </p>
            ) : (
              user.comments.map((comment) => (
                <div key={comment.id} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <Link
                      href={`/posts/${comment.post.slug}`}
                      className="text-sm font-medium text-foreground hover:underline"
                    >
                      {comment.post.title}
                    </Link>

                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {comment.body}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}