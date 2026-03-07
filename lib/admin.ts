import { auth } from '@/auth'

export async function requireAdmin() {
  const session = await auth()

  if (!session?.user?.email) {
    throw new Error('UNAUTHORIZED')
  }

  const isAdmin = session.user.email === process.env.ADMIN_EMAIL

  if (!isAdmin) {
    throw new Error('FORBIDDEN')
  }

  return session
}

export async function isAdminUser() {
  const session = await auth()

  if (!session?.user?.email) return false

  return session.user.email === process.env.ADMIN_EMAIL
}