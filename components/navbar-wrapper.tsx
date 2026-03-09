import { Navbar, type NavbarPost } from "@/components/navbar";

interface NavbarWrapperProps {
  posts: NavbarPost[];
}

export function NavbarWrapper({ posts }: NavbarWrapperProps) {
  return <Navbar posts={posts} />;
}
