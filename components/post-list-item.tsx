import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

type ListPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  tags: string[] | string | undefined;
};

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

  if (Array.isArray(tags)) return tags;

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

interface PostListItemProps {
  post: ListPost;
}

export function PostListItem({ post }: PostListItemProps) {
  const tags = normalizeTags(post.tags);

  return (
    <article className="group relative">
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
}
