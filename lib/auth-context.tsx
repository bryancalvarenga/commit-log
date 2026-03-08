'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import type { User } from '@/types'

interface AuthContextValue {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = 'commit-log-user'

function mapSessionUser(sessionUser: {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
}): User | null {
  if (!sessionUser?.email) return null

  const isAdmin = sessionUser.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL

  return {
    id: sessionUser.id ?? '',
    name: sessionUser.name ?? 'Usuário',
    username: sessionUser.email.split('@')[0],
    email: sessionUser.email,
    image: sessionUser.image ?? null,
    role: isAdmin ? 'admin' : 'user',
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [localUser, setLocalUser] = useState<User | null>(null)
  const [localLoading, setLocalLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (raw) {
      try {
        setLocalUser(JSON.parse(raw))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }

    setLocalLoading(false)
  }, [])

  const sessionUser = session?.user ? mapSessionUser(session.user) : null
  const user = sessionUser ?? localUser
  const loading = status === 'loading' || localLoading

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,

    async login(email: string, password: string) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })

        if (!response.ok) {
          return false
        }

        const loggedUser: User = await response.json()

        setLocalUser(loggedUser)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser))
        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },

    async register(name: string, email: string, password: string) {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        })

        if (!response.ok) {
          return false
        }

        const createdUser: User = await response.json()

        setLocalUser(createdUser)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(createdUser))
        return true
      } catch (error) {
        console.error('Register error:', error)
        return false
      }
    },

    async logout() {
      localStorage.removeItem(STORAGE_KEY)
      setLocalUser(null)

      if (sessionUser) {
        await signOut({ callbackUrl: '/' })
      }
    },
  }), [user, loading, sessionUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}