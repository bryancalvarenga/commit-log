import Link from "next/link";
import { GitCommit, Github, Rss, Terminal } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-secondary/20">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Branding */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <GitCommit className="size-5" />
              <span className="font-mono text-sm font-semibold tracking-tight">
                commitlog
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Um registro de estudos, ideias e aprendizados sobre software.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-12">
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Navegacao
              </h4>
              <nav
                className="flex flex-col gap-2 text-sm"
                aria-label="Footer navigation"
              >
                <Link
                  href="/posts"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Posts
                </Link>
                <Link
                  href="/tags"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Tags
                </Link>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Sobre
                </Link>
              </nav>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Links
              </h4>
              <nav className="flex flex-col gap-2 text-sm">
                <a
                  href="https://www.bryanalvarenga.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Terminal className="size-3.5" />
                  Portfólio
                </a>
                <a
                  href="https://github.com/bryancalvarenga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github className="size-3.5" />
                  Github
                </a>
                <a
                  href="/rss.xml"
                  target="_blank"
                  className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Rss className="size-3.5" />
                  RSS Feed
                </a>
              </nav>
            </div>
          </div>

          {/* Theme toggle */}
          <div className="flex items-start">
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <p className="text-xs text-muted-foreground">
            {`\u00A9 ${year} commitlog. Built with Next.js & Tailwind CSS.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
