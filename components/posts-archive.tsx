'use client'

import { useState, useMemo } from 'react'
import type { Post } from '@/types'
import { PostListItem } from '@/components/post-list-item'
import { SearchBar } from '@/components/search-bar'
import { TimelineSidebar } from '@/components/timeline-sidebar'
import { EmptyState } from '@/components/empty-state'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface PostsArchiveProps {
  posts: Post[]
  allTags: string[]
}

const POSTS_PER_PAGE = 8

export function PostsArchive({ posts, allTags }: PostsArchiveProps) {
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = posts
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    if (selectedTag) {
      result = result.filter((p) => p.tags.includes(selectedTag))
    }
    return result
  }, [posts, search, selectedTag])

  const paginated = filtered.slice(0, page * POSTS_PER_PAGE)
  const hasMore = paginated.length < filtered.length

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-semibold text-foreground">Arquivo de Posts</h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'post encontrado' : 'posts encontrados'}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="Buscar posts..." />
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant={selectedTag === null ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => { setSelectedTag(null); setPage(1) }}
          >
            Todos
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => { setSelectedTag(tag === selectedTag ? null : tag); setPage(1) }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-10">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-20">
            <TimelineSidebar posts={posts} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3">
            {paginated.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </div>

          {paginated.length === 0 && (
            <EmptyState
              title="Nenhum post encontrado."
              description="Tente buscar com outros termos ou limpe os filtros."
            />
          )}

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" onClick={() => setPage(page + 1)}>
                Carregar mais
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
