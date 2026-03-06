import { PostListSkeleton } from '@/components/skeletons'

export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <div className="skeleton mb-2 h-7 w-48" />
        <div className="skeleton h-4 w-28" />
      </div>
      <div className="mb-6">
        <div className="skeleton h-10 w-full rounded-md" />
      </div>
      <PostListSkeleton count={8} />
    </div>
  )
}
