import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'

export default async function AdminPage() {
  const session = await auth()

  if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
    redirect('/')
  }

  const [posts, comments] = await Promise.all([
    prisma.post.findMany({
      orderBy: { publishedAt: 'desc' },
      take: 20,
    }),
    prisma.comment.findMany({
      include: {
        author: true,
        post: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
  ])

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Painel admin</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie posts e comentários do commit.log
          </p>
        </div>

        <Button asChild>
          <Link href="/admin/new">Novo post</Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <section className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-medium">Posts</h2>

          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="rounded-md border p-4">
                <h3 className="font-medium">{post.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  /posts/{post.slug}
                </p>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/admin/edit/${post.slug}`}>Editar</Link>
                  </Button>

                  <form action={`/api/admin/posts/${post.id}/delete`} method="post">
                    <Button size="sm" variant="destructive" type="submit">
                      Deletar
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-medium">Comentários recentes</h2>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-md border p-4">
                <p className="text-sm font-medium">
                  {comment.author.name ?? 'Usuário'} em {comment.post.title}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  {comment.body}
                </p>

                <div className="mt-4">
                  <form action={`/api/admin/comments/${comment.id}/delete`} method="post">
                    <Button size="sm" variant="destructive" type="submit">
                      Excluir comentário
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}