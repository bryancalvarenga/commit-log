import { PostListSkeleton } from '@/components/skeletons'

export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <div className="skeleton mb-2 h-7 w-40" />
        <div className="skeleton h-4 w-24" />
      </div>
      <PostListSkeleton count={6} />
    </div>
  )
}
