'use client'

import { useCallback, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement

    if (target.closest('[data-copy-code]')) {
      const btn = target.closest('[data-copy-code]') as HTMLElement
      const wrapper = btn.closest('[data-code-wrapper]')
      const code = wrapper?.querySelector('code')?.textContent ?? ''

      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'copiado'

        setTimeout(() => {
          btn.textContent = 'copiar'
        }, 2000)
      })

      return
    }

    if (target.closest('.heading-anchor')) {
      e.preventDefault()

      const anchor = target.closest('.heading-anchor') as HTMLAnchorElement
      const id = anchor.getAttribute('href')?.slice(1)

      if (id) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        history.replaceState(null, '', `#${id}`)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="prose dark:prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0"
      onClick={handleClick}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2({ children }) {
            const text = String(children)
            const id = slugify(text)

            return (
              <h2 id={id}>
                {children}
                <a
                  href={`#${id}`}
                  className="heading-anchor ml-2 no-underline opacity-40 transition-opacity hover:opacity-100"
                >
                  #
                </a>
              </h2>
            )
          },

          h3({ children }) {
            const text = String(children)
            const id = slugify(text)

            return (
              <h3 id={id}>
                {children}
                <a
                  href={`#${id}`}
                  className="heading-anchor ml-2 no-underline opacity-40 transition-opacity hover:opacity-100"
                >
                  #
                </a>
              </h3>
            )
          },

          code({ className, children, ...props }) {
            const text = String(children).replace(/\n$/, '')
            const isBlock = className?.startsWith('language-')

            if (!isBlock) {
              return (
                <code
                  className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]"
                  {...props}
                >
                  {text}
                </code>
              )
            }

            const language = className.replace('language-', '')

            return (
              <div
                data-code-wrapper
                className="my-8 overflow-hidden rounded-xl bg-zinc-100 dark:bg-[#0d1117]"
              >
                <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="h-3 w-3 rounded-full bg-green-500" />

                    <span className="ml-3 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {language}
                    </span>
                  </div>

                  <button
                    type="button"
                    data-copy-code
                    className="text-xs text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  >
                    copiar
                  </button>
                </div>

                <pre className="overflow-x-auto p-4">
                  <code
                    className="block whitespace-pre font-mono text-[13px] leading-6 text-zinc-800 dark:text-zinc-200"
                    {...props}
                  >
                    {text}
                  </code>
                </pre>
              </div>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}