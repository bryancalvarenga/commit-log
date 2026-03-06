'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true)
    try {
      const { login: apiLogin } = await import('@/lib/api')
      const result = await apiLogin(email, _password)
      if (result) {
        setUser(result)
        return true
      }
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const { register: apiRegister } = await import('@/lib/api')
      const result = await apiRegister(name, email, password)
      setUser(result)
      return true
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
