import { GitCommit } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
}

export function EmptyState({
  title = 'Nenhum commit ainda.',
  description = 'Parece que ainda nao ha nada aqui.',
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        {icon ?? <GitCommit className="size-6" />}
      </div>
      <h3 className="mb-1 text-sm font-medium text-foreground">{title}</h3>
      <p className="max-w-xs text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
