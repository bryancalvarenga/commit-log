export function PostListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card p-5">
          <div className="flex flex-col gap-3">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-2/3" />
            <div className="flex items-center gap-3">
              <div className="skeleton h-3.5 w-24" />
              <div className="skeleton h-3.5 w-20" />
              <div className="ml-auto flex gap-1.5">
                <div className="skeleton h-5 w-14 rounded-full" />
                <div className="skeleton h-5 w-14 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ArticleSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex gap-10">
        <div className="min-w-0 flex-1">
          <div className="mb-10">
            <div className="mb-4 flex gap-1.5">
              <div className="skeleton h-5 w-16 rounded-full" />
              <div className="skeleton h-5 w-20 rounded-full" />
              <div className="skeleton h-5 w-14 rounded-full" />
            </div>
            <div className="skeleton mb-3 h-8 w-4/5" />
            <div className="skeleton mb-4 h-8 w-3/5" />
            <div className="flex gap-4">
              <div className="skeleton h-4 w-32" />
              <div className="skeleton h-4 w-28" />
              <div className="skeleton h-4 w-28" />
            </div>
          </div>
          <div className="skeleton mb-8 h-px w-full" />
          <div className="space-y-4">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton mt-6 h-6 w-2/5" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton mt-4 h-32 w-full rounded-lg" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-4/5" />
          </div>
        </div>
        <aside className="hidden w-56 shrink-0 xl:block">
          <div className="sticky top-20 space-y-2">
            <div className="skeleton mb-3 h-3 w-20" />
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-3 w-4/5" />
            <div className="skeleton h-3 w-3/5" />
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-3 w-2/3" />
          </div>
        </aside>
      </div>
    </div>
  )
}

export function CommentsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <div className="skeleton size-8 shrink-0 rounded-full" />
          <div className="flex-1 rounded-lg border bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="skeleton h-3.5 w-24" />
              <div className="skeleton h-3 w-20" />
            </div>
            <div className="skeleton h-4 w-full" />
            <div className="skeleton mt-1 h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}
