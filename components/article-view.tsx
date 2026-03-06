'use client'

import { ArticleTOC, extractTocItems } from '@/components/article-toc'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { ReactionBar } from '@/components/reaction-bar'
import { CommentSection } from '@/components/comment-section'
import { AuthorCard } from '@/components/author-card'
import { PostNavigation } from '@/components/post-navigation'
import { RelatedPosts } from '@/components/related-posts'
import { ReadingProgress } from '@/components/reading-progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import type { Post, Comment, Reaction } from '@/types'

const MONTH_NAMES = [
  'janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getUTCDate()} de ${MONTH_NAMES[d.getUTCMonth()]} de ${d.getUTCFullYear()}`
}

interface ArticleViewProps {
  post: Post
  comments: Comment[]
  reactions: Reaction[]
  previousPost: Post | null
  nextPost: Post | null
  relatedPosts: Post[]
}

export function ArticleView({ post, comments, reactions, previousPost, nextPost, relatedPosts }: ArticleViewProps) {
  const tocItems = extractTocItems(post.contentMd)

  return (
    <>
      <ReadingProgress />

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex gap-10">
          {/* Main content */}
          <article className="min-w-0 flex-1">
            {/* Header */}
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/tags/${tag}`}>
                    <Badge variant="secondary" className="text-xs font-normal transition-colors hover:bg-accent hover:text-accent-foreground">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>

              <h1 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl text-balance">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span>{post.readingTime} min de leitura</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="size-3.5" />
                  <span>{comments.length} {comments.length === 1 ? 'comentario' : 'comentarios'}</span>
                </div>
              </div>
            </header>

            {/* Mobile TOC */}
            <div className="xl:hidden">
              <ArticleTOC items={tocItems} />
            </div>

            <Separator className="mb-8" />

            {/* Content */}
            <MarkdownRenderer content={post.contentMd} />

            <Separator className="my-10" />

            {/* Reactions */}
            <div className="mb-8">
              <ReactionBar reactions={reactions} postId={post.id} />
            </div>

            {/* Author Card */}
            <div className="mb-8">
              <AuthorCard />
            </div>

            <Separator className="my-8" />

            {/* Post Navigation */}
            <div className="mb-8">
              <PostNavigation previous={previousPost} next={nextPost} />
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <>
                <Separator className="my-8" />
                <div className="mb-8">
                  <RelatedPosts posts={relatedPosts} />
                </div>
              </>
            )}

            <Separator className="my-8" />

            {/* Comments */}
            <CommentSection comments={comments} postId={post.id} />
          </article>

          {/* Desktop TOC Sidebar */}
          <aside className="hidden w-56 shrink-0 xl:block">
            <div className="sticky top-20">
              <ArticleTOC items={tocItems} />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
