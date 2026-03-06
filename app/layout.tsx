import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { NavbarWrapper } from '@/components/navbar-wrapper'
import { Footer } from '@/components/footer'
import { AuthProvider } from '@/lib/auth-context'
import { BackToTop } from '@/components/back-to-top'
import { getAllPosts } from '@/lib/api'
import { AuthSessionProvider } from '@/components/session-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'commit.log - Developer Blog',
    template: '%s | commit.log',
  },
  description:
    'A personal developer blog focused on web development, TypeScript, React, and modern software engineering.',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1117' },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const posts = await getAllPosts()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} ${jetbrainsMono.variable} antialiased`}>
        <AuthSessionProvider>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <NavbarWrapper posts={posts} />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <BackToTop />
          </AuthProvider>
        </AuthSessionProvider>
        <Analytics />
      </body>
    </html>
  )
}