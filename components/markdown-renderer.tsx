'use client'

import { useCallback, useRef } from 'react'
import { Check, Copy, Link as LinkIcon } from 'lucide-react'
import { useState } from 'react'

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
  const html = markdownToHtml(content)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement

    // Handle copy code button clicks
    if (target.closest('[data-copy-code]')) {
      const btn = target.closest('[data-copy-code]') as HTMLElement
      const pre = btn.closest('pre')
      if (!pre) return
      const code = pre.querySelector('code')?.textContent ?? ''
      navigator.clipboard.writeText(code).then(() => {
        btn.setAttribute('data-copied', 'true')
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
        setTimeout(() => {
          btn.removeAttribute('data-copied')
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`
        }, 2000)
      })
      return
    }

    // Handle heading anchor clicks
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
      className="prose"
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function markdownToHtml(md: string): string {
  let html = md

  // Code blocks (must be before inline code)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, lang, code) => {
    const escapedCode = escapeHtml(code.trim())
    const langLabel = lang ? `<span style="position:absolute;top:0.5rem;left:0.75rem;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--muted-foreground);font-family:var(--font-mono);user-select:none;">${lang}</span>` : ''
    return `<pre style="position:relative;padding-top:${lang ? '2.25rem' : '1rem'};">${langLabel}<button data-copy-code style="position:absolute;top:0.5rem;right:0.5rem;padding:0.375rem;border-radius:0.25rem;border:1px solid var(--border);background:var(--background);color:var(--muted-foreground);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:color 0.15s ease,border-color 0.15s ease;" onmouseover="this.style.color='var(--foreground)';this.style.borderColor='var(--foreground)'" onmouseout="this.style.color='var(--muted-foreground)';this.style.borderColor='var(--border)'"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg></button><code class="language-${lang || 'text'}">${escapedCode}</code></pre>`
  })

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Headings with IDs and anchor links
  html = html.replace(/^### (.+)$/gm, (_match, text) => {
    const id = slugify(text)
    return `<h3 id="${id}">${text}<a href="#${id}" class="heading-anchor" aria-label="Link para esta secao">#</a></h3>`
  })
  html = html.replace(/^## (.+)$/gm, (_match, text) => {
    const id = slugify(text)
    return `<h2 id="${id}">${text}<a href="#${id}" class="heading-anchor" aria-label="Link para esta secao">#</a></h2>`
  })

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr />')

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')

  // Paragraphs
  const lines = html.split('\n\n')
  html = lines
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<pre') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<ol') ||
        trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<hr')
      ) {
        return trimmed
      }
      if (trimmed.startsWith('<li')) return `<ul>${trimmed}</ul>`
      return `<p>${trimmed}</p>`
    })
    .join('\n')

  return html
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
