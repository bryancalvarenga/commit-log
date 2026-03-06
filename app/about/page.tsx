import { Separator } from '@/components/ui/separator'
import { GitCommit, Github, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Sobre o blog commit.log e seu autor.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold text-foreground">Sobre</h1>
        <p className="text-muted-foreground leading-relaxed">
          Bem-vindo ao commit.log.
        </p>
      </header>

      <Separator className="mb-8" />

      <section className="mb-10 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">O Blog</h2>
        <p className="leading-relaxed text-foreground">
          commit.log e um blog pessoal de desenvolvimento focado em web moderna, TypeScript,
          React e engenharia de software. Aqui compartilho artigos, tutoriais e deep dives sobre
          as ferramentas e padroes que uso no dia a dia.
        </p>
        <p className="leading-relaxed text-foreground">
          O objetivo e documentar aprendizados, explorar novas tecnologias e contribuir para a
          comunidade dev com conteudo pratico e direto ao ponto. Cada post e um commit no meu
          log de conhecimento.
        </p>
      </section>

      <Separator className="mb-8" />

      <section className="mb-10 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">O Autor</h2>
        <div className="flex items-start gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-secondary">
            <GitCommit className="size-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Desenvolvedor Full-Stack</h3>
            <p className="mt-1 leading-relaxed text-muted-foreground">
              Apaixonado por TypeScript, React e arquitetura de software. Trabalho com
              desenvolvimento web ha mais de 8 anos, focando em experiencias de usuario
              excelentes e codigo limpo.
            </p>
          </div>
        </div>
      </section>

      <Separator className="mb-8" />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Links</h2>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="size-4" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="size-4" />
              LinkedIn
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
