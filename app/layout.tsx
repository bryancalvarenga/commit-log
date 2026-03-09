import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { BackToTop } from "@/components/back-to-top";
import { getAllPosts } from "@/lib/content/posts";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "commitlog - Developer Blog",
    template: "%s | commitlog",
  },
  description:
    "O commitlog.com.br é um blog pessoal onde registro minha jornada aprendendo e explorando desenvolvimento de software.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts().map((post, index) => ({
    id: `mdx-${index}-${post.slug}`,
    slug: post.slug,
    title: post.title,
    excerpt: post.description || post.excerpt,
    tags: post.tags,
    publishedAt: post.date,
    readingTime: post.readingTime,
  }));

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.className} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <NavbarWrapper posts={posts} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <BackToTop />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
