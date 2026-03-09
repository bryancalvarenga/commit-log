"use client";

import Link from "next/link";

type TimelinePost = {
  id: string;
  slug: string;
  title: string;
  publishedAt: string;
};

interface TimelineSidebarProps {
  posts: TimelinePost[];
}

interface GroupedPosts {
  year: number;
  months: {
    month: string;
    posts: TimelinePost[];
  }[];
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

function groupPostsByDate(posts: TimelinePost[]): GroupedPosts[] {
  const grouped: Record<number, Record<string, TimelinePost[]>> = {};

  for (const post of posts) {
    const date = new Date(post.publishedAt);
    const year = date.getUTCFullYear();
    const month = MONTH_NAMES[date.getUTCMonth()];

    if (!grouped[year]) grouped[year] = {};
    if (!grouped[year][month]) grouped[year][month] = [];
    grouped[year][month].push(post);
  }

  return Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, months]) => ({
      year: Number(year),
      months: Object.entries(months).map(([month, posts]) => ({
        month,
        posts,
      })),
    }));
}

export function TimelineSidebar({ posts }: TimelineSidebarProps) {
  const grouped = groupPostsByDate(posts);

  return (
    <nav className="space-y-6" aria-label="Timeline">
      {grouped.map((group) => (
        <div key={group.year}>
          <h3 className="mb-2 font-mono text-sm font-semibold text-foreground">
            {group.year}
          </h3>

          {group.months.map((monthGroup) => (
            <div
              key={monthGroup.month}
              className="mb-3 ml-3 border-l-2 border-border pl-4"
            >
              <p className="mb-1 text-xs font-medium capitalize text-muted-foreground">
                {monthGroup.month}
              </p>

              <ul className="space-y-1">
                {monthGroup.posts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="block truncate text-xs text-muted-foreground transition-colors hover:text-foreground"
                      title={post.title}
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
}
