import fs from "node:fs";
import path from "node:path";

export type PostMeta = {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  published: boolean;
};

export type MdxPost = PostMeta & {
  content: string;
  excerpt: string;
  readingTime: number;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

function calculateReadingTime(content: string) {
  const words = content
    .replace(/[#>*`\-\[\]\(\)]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

function extractExcerpt(content: string, fallback: string) {
  const cleaned = content
    .replace(/^#+\s+/gm, "")
    .replace(/[*_`>\-]/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return cleaned[0] ?? fallback;
}

function parseFrontmatter(fileContent: string): MdxPost {
  const normalizedContent = fileContent.replace(/\r\n/g, "\n");
  const match = normalizedContent.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    throw new Error("Post sem frontmatter válido.");
  }

  const [, rawFrontmatter, content] = match;

  const meta: Record<string, unknown> = {};

  for (const line of rawFrontmatter.split("\n")) {
    const [rawKey, ...rawValueParts] = line.split(":");
    if (!rawKey || rawValueParts.length === 0) continue;

    const key = rawKey.trim();
    const rawValue = rawValueParts.join(":").trim();

    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      meta[key] = rawValue
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^"|"$/g, "").replace(/^'|'$/g, ""))
        .filter(Boolean);
    } else if (rawValue === "true" || rawValue === "false") {
      meta[key] = rawValue === "true";
    } else {
      meta[key] = rawValue.replace(/^"|"$/g, "").replace(/^'|'$/g, "");
    }
  }

  const typedMeta = meta as PostMeta;

  return {
    ...typedMeta,
    content,
    excerpt: extractExcerpt(content, typedMeta.description),
    readingTime: calculateReadingTime(content),
  };
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, "utf8");
  return parseFrontmatter(fileContent);
}

export function getAllPosts() {
  const slugs = getPostSlugs();

  return slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post))
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
