export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  contentMd: string
  publishedAt: string
  readingTime: number
  tags: string[]
  category?: string
  coverImage?: string
}

export interface User {
  id: string
  name: string | null
  username?: string
  email: string | null
  image?: string | null
  role: 'admin' | 'user'
}

export interface Comment {
  id: string
  postId: string
  author: User
  body: string
  createdAt: string
}

export type ReactionType = 'like' | 'love' | 'fire'

export interface Reaction {
  postId: string
  type: ReactionType
  count: number
  viewerHasReacted: boolean
}

export interface Tag {
  slug: string
  name: string
  postCount: number
}
