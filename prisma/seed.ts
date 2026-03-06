import { prisma } from '@/lib/prisma'
import {
  mockUsers,
  mockPosts,
  mockComments,
  mockReactions,
  mockTags,
} from '@/lib/mock-data'

async function main() {
  await prisma.postTag.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.reaction.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.post.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  for (const user of mockUsers) {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        username: user.username ?? null,
        email: user.email,
        image: user.avatarUrl ?? null,
        emailVerified: null,
        role: user.role,
      },
    })
  }

  for (const post of mockPosts) {
    await prisma.post.create({
      data: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        contentMd: post.contentMd,
        publishedAt: new Date(post.publishedAt),
        readingTime: post.readingTime,
        category: post.category ?? null,
        coverImage: post.coverImage ?? null,
      },
    })
  }

  for (const tag of mockTags) {
    await prisma.tag.create({
      data: {
        name: tag.name,
        slug: tag.slug,
      },
    })
  }

  for (const post of mockPosts) {
    for (const tagSlug of post.tags) {
      const tag = await prisma.tag.findUnique({
        where: { slug: tagSlug },
      })

      if (tag) {
        await prisma.postTag.create({
          data: {
            postId: post.id,
            tagId: tag.id,
          },
        })
      }
    }
  }

  for (const comment of mockComments) {
    await prisma.comment.create({
      data: {
        id: comment.id,
        body: comment.body,
        createdAt: new Date(comment.createdAt),
        postId: comment.postId,
        userId: comment.author.id,
      },
    })
  }

  for (const reaction of mockReactions) {
    const userId = '2'

    const exists = await prisma.reaction.findUnique({
      where: {
        postId_userId_type: {
          postId: reaction.postId,
          userId,
          type: reaction.type,
        },
      },
    })

    if (!exists) {
      await prisma.reaction.create({
        data: {
          postId: reaction.postId,
          userId,
          type: reaction.type,
        },
      })
    }
  }

  console.log('Seed completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })