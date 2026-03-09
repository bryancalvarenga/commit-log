import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { ArticleTOC } from "@/components/article-toc";
import { extractTocItems } from "@/lib/content/toc";
import { ReadingProgress } from "@/components/reading-progress";
import { AuthorCard } from "@/components/author-card";
import { Calendar, Clock } from "lucide-react";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/content/posts";
import { GiscusComments } from "@/components/giscus-comments";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const MONTH_NAMES = [
  "janeiro",
  "fevereiro",
  "marco",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getUTCDate()} de ${MONTH_NAMES[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
}

function normalizeTags(tags: string[] | string | undefined): string[] {
  if (!tags) return [];

  if (Array.isArray(tags)) {
    return tags.filter(
      (tag) => typeof tag === "string" && tag.trim().length > 0,
    );
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const postTags = normalizeTags(post.tags);

  return {
    title: post.title,
    description: post.description || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: postTags,
    },
  };
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postTags = normalizeTags(post.tags);
  const allPosts = getAllPosts();

  const postIndex = allPosts.findIndex((p) => p.slug === slug);

  const previousPost =
    postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;

  const nextPost = postIndex > 0 ? allPosts[postIndex - 1] : null;

  const relatedPosts = allPosts
    .filter((p) => {
      if (p.slug === post.slug) return false;

      const relatedTags = normalizeTags(p.tags);
      return relatedTags.some((tag) => postTags.includes(tag));
    })
    .slice(0, 4);

  const tocItems = extractTocItems(post.content);

  return (
    <>
      <ReadingProgress />

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex gap-10">
          <article className="min-w-0 flex-1">
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap gap-1.5">
                {postTags.map((tag) => (
                  <Link key={tag} href="/posts">
                    <Badge
                      variant="secondary"
                      className="text-xs font-normal transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>

              <h1 className="mb-4 text-balance text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span>{post.readingTime} min de leitura</span>
                </div>
              </div>
            </header>

            <div className="xl:hidden">
              <ArticleTOC items={tocItems} />
            </div>

            <Separator className="mb-8" />

            <MarkdownRenderer content={post.content} />

            <Separator className="my-10" />

            <div className="mb-8">
              <AuthorCard />
            </div>

            {(previousPost || nextPost) && (
              <>
                <Separator className="my-8" />

                <div className="mb-8">
                  <nav
                    className="flex flex-col gap-3 sm:flex-row sm:justify-between"
                    aria-label="Navegacao entre posts"
                  >
                    {previousPost ? (
                      <Link
                        href={`/posts/${previousPost.slug}`}
                        className="group flex flex-1 items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-ring/40 hover:bg-secondary/50"
                      >
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">
                            Anterior
                          </p>
                          <p className="truncate text-sm font-medium text-foreground">
                            {previousPost.title}
                          </p>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex-1" />
                    )}

                    {nextPost ? (
                      <Link
                        href={`/posts/${nextPost.slug}`}
                        className="group flex flex-1 items-center justify-end gap-3 rounded-lg border bg-card p-4 text-right transition-colors hover:border-ring/40 hover:bg-secondary/50"
                      >
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">
                            Proximo
                          </p>
                          <p className="truncate text-sm font-medium text-foreground">
                            {nextPost.title}
                          </p>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex-1" />
                    )}
                  </nav>
                </div>
              </>
            )}

            {relatedPosts.length > 0 && (
              <>
                <Separator className="my-8" />

                <section className="mb-8">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Posts relacionados
                  </h3>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {relatedPosts.map((relatedPost, index) => {
                      const relatedTags = normalizeTags(relatedPost.tags);

                      return (
                        <Link
                          key={`${relatedPost.slug}-${index}`}
                          href={`/posts/${relatedPost.slug}`}
                          className="group rounded-lg border bg-card p-4 transition-colors hover:border-ring/40 hover:bg-secondary/50"
                        >
                          <h4 className="mb-1.5 text-balance text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-accent-foreground">
                            {relatedPost.title}
                          </h4>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="size-3" />
                            <span>{relatedPost.readingTime} min</span>
                            <span className="text-border">|</span>

                            {relatedTags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="px-1.5 py-0 text-[10px]"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              </>
            )}

            <Separator className="my-8" />

            <section className="mb-8">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Comentários
              </h3>

              <GiscusComments />
            </section>
          </article>

          <aside className="hidden w-56 shrink-0 xl:block">
            <div className="sticky top-20">
              <ArticleTOC items={tocItems} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
