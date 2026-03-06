'use client'

import { useState, useMemo } from 'react'
import { SearchBar } from '@/components/search-bar'
import { TagBadge } from '@/components/tag-badge'
import { EmptyState } from '@/components/empty-state'
import type { Tag } from '@/types'
import { Tag as TagIcon } from 'lucide-react'

interface TagsListProps {
  tags: Tag[]
}

export function TagsList({ tags }: TagsListProps) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return tags
    const q = search.toLowerCase()
    return tags.filter((t) => t.name.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q))
  }, [tags, search])

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-semibold text-foreground">Tags</h1>
        <p className="text-sm text-muted-foreground">
          {tags.length} tags no total
        </p>
      </div>

      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar tags..." />
      </div>

      <div className="flex flex-wrap gap-2">
        {filtered.map((tag) => (
          <TagBadge key={tag.slug} slug={tag.slug} name={tag.name} count={tag.postCount} />
        ))}
      </div>

      {filtered.length === 0 && (
        <EmptyState
          title="Nenhuma tag encontrada."
          description="Tente buscar com outros termos."
          icon={<TagIcon className="size-6" />}
        />
      )}
    </div>
  )
}
