import { redirect, notFound } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { AdminPostForm } from '@/components/admin-post-form'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function EditPostPage({ params }: PageProps) {
  const session = await auth()

  if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
    redirect('/')
  }

  const { slug } = await params

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })

  if (!post) {
    notFound()
  }

  const tagsValue = post.tags.map((pt) => pt.tag.slug).join(', ')

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Editar post</h1>

      <AdminPostForm
        action={`/api/admin/posts/${post.id}/update`}
        submitLabel="Salvar alterações"
        initialValues={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          category: post.category ?? '',
          tags: tagsValue,
          contentMd: post.contentMd,
        }}
      />
    </div>
  )
}