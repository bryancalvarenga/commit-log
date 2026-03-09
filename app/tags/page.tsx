import { getAllPosts } from "@/lib/content/posts";
import { TagsList } from "@/components/tags-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
  description: "Todas as tags do blog commit.log.",
};

export default function TagsPage() {
  const posts = getAllPosts();

  const tagMap = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }

  const tags = Array.from(tagMap.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase(),
    postCount: count,
  }));

  return <TagsList tags={tags} />;
}
