import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content/posts";
import { PostsArchive } from "@/components/posts-archive";

export const metadata: Metadata = {
  title: "Posts",
  description: "Arquivo completo de posts do blog commitlog.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  const adaptedPosts = posts.map((post, index) => ({
    id: `mdx-${index}-${post.slug}`,
    slug: post.slug,
    title: post.title,
    excerpt: post.description || post.excerpt,
    tags: post.tags,
    publishedAt: post.date,
    readingTime: post.readingTime,
  }));

  const allTags = Array.from(
    new Set(adaptedPosts.flatMap((p) => p.tags)),
  ).sort();

  return <PostsArchive posts={adaptedPosts} allTags={allTags} />;
}
