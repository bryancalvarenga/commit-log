import type { Comment, Post, Reaction, ReactionType, Tag, User } from '@/types'
import { prisma } from '@/lib/prisma'

function mapPost(post: any): Post {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    contentMd: post.contentMd,
    publishedAt: post.publishedAt.toISOString().slice(0, 10),
    readingTime: post.readingTime,
    tags: post.tags.map((pt: any) => pt.tag.slug),
    category: post.category ?? undefined,
    coverImage: post.coverImage ?? undefined,
  }
}

function mapUser(user: any): User {
  return {
    id: user.id,
    name: user.name,
    username: user.username ?? undefined,
    email: user.email,
    avatarUrl: user.avatarUrl ?? undefined,
    provider: user.provider,
    role: user.role,
  }
}

function mapComment(comment: any): Comment {
  return {
    id: comment.id,
    postId: comment.postId,
    body: comment.body,
    createdAt: comment.createdAt.toISOString(),
    author: mapUser(comment.author),
  }
}

function mapReaction(reaction: any): Reaction {
  return {
    postId: reaction.postId,
    type: reaction.type,
    count: reaction.count,
    viewerHasReacted: false,
  }
}

export async function getPosts(params?: {
  page?: number
  limit?: number
  tag?: string
  search?: string
}): Promise<{ posts: Post[]; total: number }> {
  const page = params?.page ?? 1
  const limit = params?.limit ?? 6
  const skip = (page - 1) * limit

  const where: any = {}

  if (params?.search) {
    where.OR = [
      { title: { contains: params.search, mode: 'insensitive' } },
      { excerpt: { contains: params.search, mode: 'insensitive' } },
      {
        tags: {
          some: {
            tag: {
              slug: { contains: params.search, mode: 'insensitive' },
            },
          },
        },
      },
    ]
  }

  if (params?.tag) {
    where.tags = {
      some: {
        tag: {
          slug: params.tag,
        },
      },
    }
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      skip,
      take: limit,
    }),
    prisma.post.count({ where }),
  ])

  return {
    posts: posts.map(mapPost),
    total,
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
  })

  return posts.map(mapPost)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })

  return post ? mapPost(post) : null
}

export async function searchPosts(query: string): Promise<Post[]> {
  const { posts } = await getPosts({ search: query, limit: 50, page: 1 })
  return posts
}

export async function getTags(): Promise<Tag[]> {
  const tags = await prisma.tag.findMany({
    include: {
      posts: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return tags.map((tag) => ({
    slug: tag.slug,
    name: tag.name,
    postCount: tag.posts.length,
  }))
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const tag = await prisma.tag.findUnique({
    where: { slug },
    include: {
      posts: true,
    },
  })

  if (!tag) return null

  return {
    slug: tag.slug,
    name: tag.name,
    postCount: tag.posts.length,
  }
}

export async function getComments(postId: string): Promise<Comment[]> {
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return comments.map(mapComment)
}

export async function createComment(postId: string, body: string, author: User): Promise<Comment> {
  const comment = await prisma.comment.create({
    data: {
      id: String(Date.now()),
      postId,
      body,
      userId: author.id,
      createdAt: new Date(),
    },
    include: {
      author: true,
    },
  })

  return mapComment(comment)
}

export async function getReactions(postId: string): Promise<Reaction[]> {
  const grouped = await prisma.reaction.groupBy({
    by: ['type'],
    where: { postId },
    _count: {
      type: true,
    },
  })

  const reactionTypes: ReactionType[] = ['like', 'love', 'fire']

  return reactionTypes.map((type) => {
    const found = grouped.find((g) => g.type === type)

    return {
      postId,
      type,
      count: found?._count.type ?? 0,
      viewerHasReacted: false,
    }
  })
}

export async function toggleReaction(
  postId: string,
  userId: string,
  type: ReactionType
): Promise<Reaction> {
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

    return {
      postId,
      type,
      count,
      viewerHasReacted: false,
    }
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

  return {
    postId,
    type,
    count,
    viewerHasReacted: true,
  }
}

let currentUser: User | null = null





