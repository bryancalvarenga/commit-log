import { Navbar } from '@/components/navbar'
import type { Post } from '@/types'

interface NavbarWrapperProps {
  posts: Post[]
}

export function NavbarWrapper({ posts }: NavbarWrapperProps) {
  return <Navbar posts={posts} />
}
