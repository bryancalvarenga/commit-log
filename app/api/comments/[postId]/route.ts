import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteContext {
  params: Promise<{ postId: string }>
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { postId } = await params

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error('GET /api/comments/[postId] error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}