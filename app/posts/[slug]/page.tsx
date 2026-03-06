import { getPostBySlug, getComments, getReactions, getAllPosts } from '@/lib/api'
import { ArticleView } from '@/components/article-view'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post not found' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const allPosts = await getAllPosts()
  const postIndex = allPosts.findIndex((p) => p.slug === slug)

  if (postIndex === -1) notFound()

  const post = allPosts[postIndex]

  const [comments, reactions] = await Promise.all([
    getComments(post.id),
    getReactions(post.id),
  ])

  // Previous and next posts
  const previousPost = postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null
  const nextPost = postIndex > 0 ? allPosts[postIndex - 1] : null

  // Related posts: same tags, exclude current
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 4)

  return (
    <ArticleView
      post={post}
      comments={comments}
      reactions={reactions}
      previousPost={previousPost}
      nextPost={nextPost}
      relatedPosts={relatedPosts}
    />
  )
}
