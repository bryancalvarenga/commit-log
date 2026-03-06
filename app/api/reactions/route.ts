import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autenticado.' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { postId, type } = body

    if (!postId || !type) {
      return NextResponse.json(
        { error: 'postId e type são obrigatórios.' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado.' },
        { status: 404 }
      )
    }

    const existing = await prisma.reaction.findUnique({
      where: {
        postId_userId_type: {
          postId,
          userId: user.id,
          type,
        },
      },
    })

    if (existing) {
      await prisma.reaction.delete({
        where: { id: existing.id },
      })

      const count = await prisma.reaction.count({
        where: { postId, type },
      })

      return NextResponse.json({
        postId,
        type,
        count,
        viewerHasReacted: false,
      })
    }

    await prisma.reaction.create({
      data: {
        postId,
        userId: user.id,
        type,
      },
    })

    const count = await prisma.reaction.count({
      where: { postId, type },
    })

    return NextResponse.json({
      postId,
      type,
      count,
      viewerHasReacted: true,
    })
  } catch (error) {
    console.error('POST /api/reactions error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    )
  }
}