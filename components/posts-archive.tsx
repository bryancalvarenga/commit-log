"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/search-bar";
import { TimelineSidebar } from "@/components/timeline-sidebar";
import { EmptyState } from "@/components/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

type PostArchiveItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[] | string | undefined;
  publishedAt: string;
  readingTime: number;
};

interface PostsArchiveProps {
  posts: PostArchiveItem[];
  allTags: string[];
}

const POSTS_PER_PAGE = 8;

const SHORT_MONTHS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getUTCDate()} ${SHORT_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
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

export function PostsArchive({ posts, allTags }: PostsArchiveProps) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = posts;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => {
        const tags = normalizeTags(p.tags);

        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          tags.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    if (selectedTag) {
      result = result.filter((p) => {
        const tags = normalizeTags(p.tags);
        return tags.includes(selectedTag);
      });
    }

    return result;
  }, [posts, search, selectedTag]);

  const paginated = filtered.slice(0, page * POSTS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-semibold text-foreground">
          Todos os posts
        </h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length}{" "}
          {filtered.length === 1 ? "post encontrado" : "posts encontrados"}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4">
        <SearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          placeholder="Buscar posts..."
        />

        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant={selectedTag === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => {
              setSelectedTag(null);
              setPage(1);
            }}
          >
            Todos
          </Badge>

          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                setSelectedTag(tag === selectedTag ? null : tag);
                setPage(1);
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-10">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-20">
            <TimelineSidebar posts={paginated} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3">
            {paginated.map((post) => {
              const tags = normalizeTags(post.tags);

              return (
                <article key={post.id} className="group relative">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="block rounded-lg border bg-card p-5 transition-all duration-200 hover:border-ring/30 hover:bg-secondary/40 hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-3">
                      <h3 className="text-base font-semibold leading-snug text-card-foreground transition-colors group-hover:text-accent-foreground text-balance sm:text-lg">
                        {post.title}
                      </h3>

                      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="size-3.5" />
                          <time dateTime={post.publishedAt}>
                            {formatShortDate(post.publishedAt)}
                          </time>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="size-3.5" />
                          <span>{post.readingTime} min</span>
                        </div>

                        <div className="ml-auto flex flex-wrap gap-1.5">
                          {tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="px-1.5 py-0 text-[11px] font-normal"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          {paginated.length === 0 && (
            <EmptyState
              title="Nenhum post encontrado."
              description="Tente buscar com outros termos ou limpe os filtros."
            />
          )}

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" onClick={() => setPage(page + 1)}>
                Carregar mais
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
