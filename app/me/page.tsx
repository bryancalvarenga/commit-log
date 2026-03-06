'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useEffect } from 'react'
import { LogOut, User, Mail, Shield } from 'lucide-react'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) return null

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <div className="rounded-lg border bg-card p-8">
        <div className="mb-6 flex flex-col items-center gap-4">
          <Avatar className="size-20">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-xl">{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h1 className="text-xl font-semibold text-foreground">{user.name}</h1>
            {user.username && (
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            )}
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="size-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <User className="size-4 text-muted-foreground" />
            <span className="text-sm text-foreground">
              {'Provedor: '}
              <Badge variant="secondary" className="ml-1">{user.provider}</Badge>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="size-4 text-muted-foreground" />
            <span className="text-sm text-foreground">
              {'Role: '}
              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="ml-1">
                {user.role}
              </Badge>
            </span>
          </div>
        </div>

        <Separator className="my-6" />

        <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
          <LogOut className="size-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}
