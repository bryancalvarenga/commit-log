'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useEffect } from 'react'
import { LogOut, Mail, Shield, PencilLine } from 'lucide-react'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) return null

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <div className="rounded-lg border bg-card p-8">
        <div className="mb-6 flex flex-col items-center gap-4">
          <Avatar className="size-20 border">
            <AvatarImage src={user.image ?? undefined} alt={user.name ?? 'Usuário'} />
            <AvatarFallback className="text-xl">
              {user.name?.[0] ?? 'U'}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h1 className="text-xl font-semibold text-foreground">
              {user.name ?? 'Usuário'}
            </h1>

            {user.username && (
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            )}
          </div>

          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
            {user.role === 'admin' ? 'Administrador' : 'Leitor'}
          </Badge>
        </div>

        <Separator className="mb-6" />

        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <Mail className="size-4 text-muted-foreground" />
            <span className="text-foreground">{user.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="size-4 text-muted-foreground" />
            <span className="text-foreground">
              Permissão:{' '}
              <span className="font-medium">
                {user.role === 'admin' ? 'pode gerenciar posts' : 'pode comentar e reagir'}
              </span>
            </span>
          </div>
        </div>

        {user.role === 'admin' && (
          <>
            <Separator className="my-6" />

            <Button asChild className="w-full gap-2">
              <Link href="/admin">
                <PencilLine className="size-4" />
                Ir para o painel
              </Link>
            </Button>
          </>
        )}

        <Separator className="my-6" />

        <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
          <LogOut className="size-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}