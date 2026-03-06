import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteContext {
  params: Promise<{ postId: string }>
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { postId } = await params
    const userId = req.nextUrl.searchParams.get('userId')

    const grouped = await prisma.reaction.groupBy({
      by: ['type'],
      where: { postId },
      _count: {
        type: true,
      },
    })

    const userReactions = userId
      ? await prisma.reaction.findMany({
          where: { postId, userId },
          select: { type: true },
        })
      : []

    const reactedTypes = new Set(userReactions.map((r) => r.type))
    const reactionTypes = ['like', 'love', 'fire'] as const

    const reactions = reactionTypes.map((type) => {
      const found = grouped.find((g) => g.type === type)

      return {
        postId,
        type,
        count: found?._count.type ?? 0,
        viewerHasReacted: reactedTypes.has(type),
      }
    })

    return NextResponse.json(reactions)
  } catch (error) {
    console.error('GET /api/reactions/[postId] error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}