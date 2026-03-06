import { getAllPosts } from '@/lib/api'
import { PostsArchive } from '@/components/posts-archive'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Arquivo completo de posts do blog commit.log.',
}

export default async function PostsPage() {
  const posts = await getAllPosts()
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort()

  return <PostsArchive posts={posts} allTags={allTags} />
}
