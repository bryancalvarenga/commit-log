import Link from "next/link";
import { getAllPosts } from "@/lib/content/posts";
import { PostListItem } from "@/components/post-list-item";
import { ArrowRight, GitCommit } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 6);

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
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Hero */}
      <section className="mb-12">
        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
          <GitCommit className="size-5" />
          <span className="font-mono text-sm">v1.0.0</span>
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
          Notas sobre desenvolvimento web, TypeScript e engenharia de software.
        </h1>

        <p className="max-w-lg text-muted-foreground leading-relaxed">
          Artigos, tutoriais e exploracoes sobre as ferramentas e padroes do
          ecossistema moderno. Cada post e um commit no log.
        </p>
      </section>

      {/* Recent posts */}
      <section>
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Posts recentes
          </h2>

          <Link
            href="/posts"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Ver todos
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {mappedPosts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" asChild className="gap-2">
            <Link href="/posts">
              Ver todos os posts
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
