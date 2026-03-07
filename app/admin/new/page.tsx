import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { AdminPostForm } from '@/components/admin-post-form'

export default async function NewPostPage() {
  const session = await auth()

  if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
    redirect('/')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Novo post</h1>

      <AdminPostForm
        action="/api/admin/posts"
        submitLabel="Publicar post"
      />
    </div>
  )
}