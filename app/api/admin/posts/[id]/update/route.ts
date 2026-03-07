import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin'

interface RouteContext {
  params: Promise<{ id: string }>
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    await requireAdmin()
    const { id } = await params

    const formData = await req.formData()

    const title = String(formData.get('title') || '').trim()
    const slug = String(formData.get('slug') || '').trim()
    const excerpt = String(formData.get('excerpt') || '').trim()
    const category = String(formData.get('category') || '').trim() || null
    const contentMd = String(formData.get('contentMd') || '').trim()
    const tagsRaw = String(formData.get('tags') || '').trim()

    if (!title || !slug || !excerpt || !contentMd) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes.' },
        { status: 400 }
      )
    }

    const existingPostWithSlug = await prisma.post.findUnique({
      where: { slug },
    })

    if (existingPostWithSlug && existingPostWithSlug.id !== id) {
      return NextResponse.json(
        { error: 'Já existe outro post com esse slug.' },
        { status: 409 }
      )
    }

    await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        category,
        contentMd,
        readingTime: estimateReadingTime(contentMd),
      },
    })

    await prisma.postTag.deleteMany({
      where: { postId: id },
    })

    const tags = tagsRaw
      .split(',')
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)

    for (const tagSlug of tags) {
      let tag = await prisma.tag.findUnique({
        where: { slug: tagSlug },
      })

      if (!tag) {
        tag = await prisma.tag.create({
          data: {
            name: tagSlug,
            slug: tagSlug,
          },
        })
      }

      await prisma.postTag.create({
        data: {
          postId: id,
          tagId: tag.id,
        },
      })
    }

    return NextResponse.redirect(new URL('/admin', req.url))
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    }

    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Sem permissão.' }, { status: 403 })
    }

    console.error('UPDATE POST error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    )
  }
}