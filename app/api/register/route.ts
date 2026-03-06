import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return NextResponse.json(
        { error: 'name, email and password are required' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email já está em uso.' },
        { status: 409 }
      )
    }

    const initials = name
      .trim()
      .split(' ')
      .map((n: string) => n[0])
      .join('')

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        username: normalizedEmail.split('@')[0],
        email: normalizedEmail,
        image: `https://api.dicebear.com/9.x/initials/svg?seed=${initials}`,
        role: 'user',
      },
    })

    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        image: user.image,
        role: user.role,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/register error:', error)

    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    )
  }
}