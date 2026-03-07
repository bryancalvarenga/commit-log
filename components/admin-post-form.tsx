'use client'

import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface AdminPostFormProps {
  action: string
  initialValues?: {
    title?: string
    slug?: string
    excerpt?: string
    category?: string
    tags?: string
    contentMd?: string
  }
  submitLabel?: string
}

export function AdminPostForm({
  action,
  initialValues,
  submitLabel = 'Salvar',
}: AdminPostFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [slug, setSlug] = useState(initialValues?.slug ?? '')
  const [excerpt, setExcerpt] = useState(initialValues?.excerpt ?? '')
  const [category, setCategory] = useState(initialValues?.category ?? '')
  const [tags, setTags] = useState(initialValues?.tags ?? '')
  const [contentMd, setContentMd] = useState(initialValues?.contentMd ?? '')
  const [mode, setMode] = useState<'split' | 'write' | 'preview'>('split')

  const previewContent = useMemo(() => {
    return contentMd.trim()
      ? contentMd
      : '## Preview\n\nSeu conteúdo em markdown aparecerá aqui.'
  }, [contentMd])

  return (
    <form action={action} method="post" className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Título</label>
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Slug</label>
          <Input
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Resumo</label>
        <Textarea
          name="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Categoria</label>
          <Input
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Tags (separadas por vírgula)
          </label>
          <Input
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="nextjs, typescript, prisma"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium">Conteúdo Markdown</label>

          <Tabs
            value={mode}
            onValueChange={(value) => setMode(value as 'split' | 'write' | 'preview')}
          >
            <TabsList>
              <TabsTrigger value="write">Escrever</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="split">Dividido</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div
          className={`grid gap-4 ${
            mode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {(mode === 'write' || mode === 'split') && (
            <div className="space-y-2">
              <Textarea
                name="contentMd"
                value={contentMd}
                onChange={(e) => setContentMd(e.target.value)}
                className="min-h-[420px] font-mono text-sm"
                required
              />
            </div>
          )}

          {(mode === 'preview' || mode === 'split') && (
            <div className="min-h-[420px] rounded-lg border bg-card p-6">
              <article className="prose prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {previewContent}
                </ReactMarkdown>
              </article>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit">{submitLabel}</Button>
        <Button type="button" variant="outline" asChild>
          <a href="/admin">Cancelar</a>
        </Button>
      </div>
    </form>
  )
}