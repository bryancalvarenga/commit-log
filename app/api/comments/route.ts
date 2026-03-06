import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { postId, userId, content } = body

    if (!postId || !userId || !content?.trim()) {
      return NextResponse.json(
        { error: 'postId, userId and content are required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const comment = await prisma.comment.create({
      data: {
        id: String(Date.now()),
        postId,
        userId,
        body: content.trim(),
        createdAt: new Date(),
      },
      include: {
        author: true,
      },
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('POST /api/comments error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}