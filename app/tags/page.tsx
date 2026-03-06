import { getTags } from '@/lib/api'
import { TagsList } from '@/components/tags-list'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Todas as tags do blog commit.log.',
}

export default async function TagsPage() {
  const tags = await getTags()
  return <TagsList tags={tags} />
}
