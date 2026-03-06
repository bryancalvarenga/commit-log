import type { Post, User, Comment, Reaction, ReactionType, Tag } from '@/types'
import { mockPosts, mockComments, mockReactions, mockTags, mockUsers } from './mock-data'

// --- Posts ---

export async function getPosts(params?: {
  page?: number
  limit?: number
  tag?: string
  search?: string
}): Promise<{ posts: Post[]; total: number }> {
  let filtered = [...mockPosts]
  if (params?.tag) {
    filtered = filtered.filter((p) => p.tags.includes(params.tag!))
  }
  if (params?.search) {
    const q = params.search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    )
  }
  const page = params?.page ?? 1
  const limit = params?.limit ?? 6
  const start = (page - 1) * limit
  return {
    posts: filtered.slice(start, start + limit),
    total: filtered.length,
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return mockPosts.find((p) => p.slug === slug) ?? null
}

export async function searchPosts(query: string): Promise<Post[]> {
  const q = query.toLowerCase()
  return mockPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  )
}

export async function getAllPosts(): Promise<Post[]> {
  return [...mockPosts]
}

// --- Tags ---

export async function getTags(): Promise<Tag[]> {
  return [...mockTags]
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  return mockTags.find((t) => t.slug === slug) ?? null
}

// --- Comments ---

export async function getComments(postId: string): Promise<Comment[]> {
  return mockComments.filter((c) => c.postId === postId)
}

export async function createComment(postId: string, body: string, author: User): Promise<Comment> {
  const comment: Comment = {
    id: String(Date.now()),
    postId,
    author,
    body,
    createdAt: new Date().toISOString(),
  }
  mockComments.push(comment)
  return comment
}

// --- Reactions ---

export async function getReactions(postId: string): Promise<Reaction[]> {
  return mockReactions.filter((r) => r.postId === postId)
}

export async function toggleReaction(
  postId: string,
  type: ReactionType
): Promise<Reaction> {
  const reaction = mockReactions.find(
    (r) => r.postId === postId && r.type === type
  )
  if (reaction) {
    reaction.viewerHasReacted = !reaction.viewerHasReacted
    reaction.count += reaction.viewerHasReacted ? 1 : -1
    return reaction
  }
  const newReaction: Reaction = {
    postId,
    type,
    count: 1,
    viewerHasReacted: true,
  }
  mockReactions.push(newReaction)
  return newReaction
}

// --- Auth ---

let currentUser: User | null = null

export async function login(email: string, _password: string): Promise<User | null> {
  const user = mockUsers.find((u) => u.email === email)
  if (user) {
    currentUser = user
    return user
  }
  return null
}

export async function register(
  name: string,
  email: string,
  _password: string
): Promise<User> {
  const user: User = {
    id: String(Date.now()),
    name,
    email,
    avatarUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${name.split(' ').map(n => n[0]).join('')}`,
    provider: 'local',
    role: 'user',
  }
  mockUsers.push(user)
  currentUser = user
  return user
}

export async function getMe(): Promise<User | null> {
  return currentUser
}

export async function logout(): Promise<void> {
  currentUser = null
}
