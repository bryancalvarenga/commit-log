import { getTagBySlug, getPosts, getTags } from '@/lib/api'
import { PostListItem } from '@/components/post-list-item'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tag = await getTagBySlug(slug)
  if (!tag) return { title: 'Tag not found' }
  return {
    title: `Tag: ${tag.name}`,
    description: `Posts com a tag ${tag.name}.`,
  }
}

export async function generateStaticParams() {
  const tags = await getTags()
  return tags.map((tag) => ({ slug: tag.slug }))
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params
  const tag = await getTagBySlug(slug)
  if (!tag) notFound()

  const { posts } = await getPosts({ tag: slug, limit: 100 })

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4 gap-1.5 text-muted-foreground">
          <Link href="/tags">
            <ArrowLeft className="size-3.5" />
            Todas as tags
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold text-foreground">
          {tag.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {tag.postCount} {tag.postCount === 1 ? 'post' : 'posts'}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Nenhum post com esta tag.
        </p>
      )}
    </div>
  )
}
