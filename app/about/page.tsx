import { Separator } from "@/components/ui/separator";
import { GitCommit, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Sobre o blog commitlog e seu autor.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold text-foreground">Sobre</h1>
        <p className="text-muted-foreground leading-relaxed">
          Bem-vindo ao <span className="font-medium">commitlog</span>.
        </p>
      </header>

      <Separator className="mb-8" />

      <section className="mb-10 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">O Blog</h2>

        <p className="leading-relaxed text-foreground">
          O <strong>commitlog.com.br</strong> é um blog pessoal onde registro
          minha jornada aprendendo e explorando desenvolvimento de software.
        </p>

        <p className="leading-relaxed text-foreground">
          Aqui compartilho estudos, ideias, experimentos e reflexões sobre
          programação, arquitetura de software e desenvolvimento web moderno.
          Muitos posts nascem simplesmente da curiosidade de entender como algo
          funciona.
        </p>

        <p className="leading-relaxed text-foreground">
          O nome <strong>commitlog</strong> vem de uma analogia simples: cada
          artigo é como um commit no histórico do meu aprendizado. Pequenos
          registros que mostram a evolução ao longo do tempo.
        </p>

        <p className="leading-relaxed text-foreground">
          O blog é construído com <strong>Next.js</strong>,{" "}
          <strong>TypeScript</strong>,<strong>MDX</strong> e algumas ferramentas
          modernas da web. Ele é intencionalmente simples — focado em conteúdo,
          não em complexidade.
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
            <h3 className="font-medium text-foreground">Bryan Alvarenga</h3>

            <p className="mt-1 leading-relaxed text-muted-foreground">
              Estudante de Engenharia de Software interessado em entender como
              sistemas são projetados e construídos. Gosto de explorar tanto o
              lado visual quanto a lógica por trás das aplicações, especialmente
              no ecossistema web.
            </p>

            <p className="mt-2 leading-relaxed text-muted-foreground">
              Ainda estou descobrindo exatamente onde minha especialização vai
              se consolidar — frontend, backend ou algo entre os dois. Por
              enquanto, estou focado em fortalecer fundamentos e construir
              projetos simples, mas bem pensados.
            </p>
          </div>
        </div>
      </section>

      <Separator className="mb-8" />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Links</h2>

        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a
              href="https://github.com/bryancalvarenga"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
              GitHub
            </a>
          </Button>

          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a
              href="https://www.linkedin.com/in/bryanalvarenga/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
