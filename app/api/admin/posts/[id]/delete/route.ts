import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    await requireAdmin()
    const { id } = await params

    await prisma.post.delete({
      where: { id },
    })

    return NextResponse.redirect(new URL('/admin', req.url))
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    }

    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Sem permissão.' }, { status: 403 })
    }

    console.error('DELETE POST error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    )
  }
}