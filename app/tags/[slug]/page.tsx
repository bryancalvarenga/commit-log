import { getAllPosts } from "@/lib/content/posts";
import { PostListItem } from "@/components/post-list-item";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Tag: ${slug}`,
    description: `Posts com a tag ${slug}`,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).map((tag) => ({
    slug: tag.toLowerCase(),
  }));
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;

  const posts = getAllPosts().filter((post) =>
    post.tags.some((tag) => tag.toLowerCase() === slug),
  );

  if (!posts.length) notFound();

  const mappedPosts = posts.map((post, index) => ({
    id: `mdx-${index}-${post.slug}`,
    slug: post.slug,
    title: post.title,
    excerpt: post.description || post.excerpt,
    tags: post.tags,
    publishedAt: post.date,
    readingTime: post.readingTime,
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-4 gap-1.5 text-muted-foreground"
        >
          <Link href="/tags">
            <ArrowLeft className="size-3.5" />
            Todas as tags
          </Link>
        </Button>

        <h1 className="text-2xl font-semibold text-foreground">{slug}</h1>

        <p className="text-sm text-muted-foreground">
          {mappedPosts.length} {mappedPosts.length === 1 ? "post" : "posts"}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {mappedPosts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
