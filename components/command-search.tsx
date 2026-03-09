"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
};

interface CommandSearchProps {
  posts: SearchPost[];
}

export function CommandSearch({ posts }: CommandSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim()
    ? posts
        .filter(
          (p) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())),
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !open &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        )
      ) {
        e.preventDefault();
        setOpen(true);
      }

      if (e.key === "Escape" && open) {
        setOpen(false);
        setQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyNav = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        setOpen(false);
        setQuery("");
        router.push(`/posts/${results[selectedIndex].slug}`);
      }
    },
    [results, selectedIndex, router],
  );

  const navigate = (slug: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/posts/${slug}`);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-md border bg-secondary/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:flex"
      >
        <Search className="size-3.5" />
        <span>Buscar...</span>
        <kbd className="ml-2 rounded border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          /
        </kbd>
      </button>

      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
        aria-label="Buscar"
      >
        <Search className="size-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
          />

          <div
            className="relative z-50 w-full max-w-lg rounded-xl border bg-card shadow-2xl"
            role="dialog"
            aria-label="Buscar posts"
          >
            <div className="flex items-center gap-3 border-b px-4 py-3">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyNav}
                placeholder="Buscar posts..."
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                autoComplete="off"
              />
              <kbd className="rounded border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>

            {query.trim() && (
              <div className="max-h-72 overflow-y-auto p-2">
                {results.length > 0 ? (
                  <ul role="listbox">
                    {results.map((post, i) => (
                      <li
                        key={post.id}
                        role="option"
                        aria-selected={i === selectedIndex}
                      >
                        <button
                          onClick={() => navigate(post.slug)}
                          onMouseEnter={() => setSelectedIndex(i)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                            i === selectedIndex
                              ? "bg-secondary text-foreground"
                              : "text-muted-foreground hover:bg-secondary/50",
                          )}
                        >
                          <FileText className="size-4 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {post.title}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {post.excerpt}
                            </p>
                          </div>
                          {i === selectedIndex && (
                            <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      Nenhum resultado para &ldquo;{query}&rdquo;
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Tente buscar com outros termos.
                    </p>
                  </div>
                )}
              </div>
            )}

            {!query.trim() && (
              <div className="p-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Comece a digitar para buscar posts...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
