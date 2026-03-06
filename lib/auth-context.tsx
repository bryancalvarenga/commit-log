'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { User } from '@/types'

interface AuthContextValue {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = 'commit-log-user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        setUser(JSON.parse(raw))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,

    async login(email: string, _password: string) {
      const fakeUsers: User[] = [
        {
          id: '1',
          name: 'Admin Author',
          username: 'admin',
          email: 'admin@commitlog.dev',
          avatarUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=AA',
          provider: 'github',
          role: 'admin',
        },
        {
          id: '2',
          name: 'Maria Silva',
          username: 'mariasilva',
          email: 'maria@example.com',
          avatarUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=MS',
          provider: 'github',
          role: 'user',
        },
        {
          id: '3',
          name: 'John Doe',
          username: 'johndoe',
          email: 'john@example.com',
          avatarUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=JD',
          provider: 'local',
          role: 'user',
        },
      ]

      const found = fakeUsers.find((u) => u.email === email)
      if (!found) return false

      setUser(found)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found))
      return true
    },

    async register(name: string, email: string, _password: string) {
      const newUser: User = {
        id: String(Date.now()),
        name,
        email,
        avatarUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${name}`,
        provider: 'local',
        role: 'user',
      }

      setUser(newUser)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
      return true
    },

    logout() {
      setUser(null)
      localStorage.removeItem(STORAGE_KEY)
    },
  }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}