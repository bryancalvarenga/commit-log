import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { postId, userId, type } = body

    if (!postId || !userId || !type) {
      return NextResponse.json(
        { error: 'postId, userId and type are required' },
        { status: 400 }
      )
    }

    const existing = await prisma.reaction.findUnique({
      where: {
        postId_userId_type: {
          postId,
          userId,
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
        userId,
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
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}