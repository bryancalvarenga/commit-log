
# commit.log

commit.log é um blog pessoal de desenvolvimento criado para registrar estudos, ideias e experimentos relacionados à programação e engenharia de software.

O projeto foi construído com foco em simplicidade arquitetural, legibilidade e versionamento completo do conteúdo. Em vez de depender de um CMS ou banco de dados, os artigos são escritos diretamente no repositório em arquivos MDX.

Cada post representa um pequeno registro de aprendizado — semelhante a commits em um histórico de desenvolvimento.

O blog funciona como um log público de evolução técnica.

---

# Objetivo do projeto

O objetivo do commit.log é servir como:

- um registro público de aprendizado em programação
- um espaço para explorar conceitos de engenharia de software
- um ambiente de experimentação com tecnologias modernas da web
- um repositório de conhecimento versionado com Git

O projeto também busca manter uma arquitetura simples, evitando complexidade desnecessária.

---

# Stack utilizada

## Framework

- Next.js (App Router)
- React
- TypeScript

## Estilização

- TailwindCSS
- shadcn/ui

## Conteúdo

- MDX
- react-markdown
- remark-gfm

## Outras ferramentas

- Giscus (comentários via GitHub Discussions)
- Vercel Analytics

---

# Arquitetura do projeto

O blog segue uma arquitetura simples baseada em conteúdo local.

Posts são armazenados como arquivos MDX no próprio repositório e carregados dinamicamente durante o build.

Essa abordagem oferece algumas vantagens:

- versionamento completo dos artigos
- nenhuma dependência de banco de dados
- simplicidade de manutenção
- deploy estático eficiente

---

# Estrutura do projeto

```
app/
  posts/               páginas individuais dos artigos
  about/               página sobre o autor

components/
  ui/                  componentes base de interface
  markdown-renderer    renderização de conteúdo MDX
  post-list-item       preview de posts

content/
  posts/               arquivos MDX dos artigos

lib/
  content/             carregamento e parsing de posts
```

Os artigos ficam dentro de:

```
content/posts
```

---

# Estrutura de um post

Cada artigo é um arquivo `.mdx` com frontmatter.

Exemplo:

```
---
title: Título do post
description: Descrição curta
date: YYYY-MM-DD
slug: slug-do-post
tags: [tag1, tag2]
published: true
---

# Título do artigo

Conteúdo escrito em Markdown ou MDX.
```

Durante o build, os arquivos são processados e transformados em páginas estáticas.

---

# Sistema de comentários

O blog utiliza **Giscus** para comentários.

Giscus conecta o blog a **GitHub Discussions**, permitindo:

- comentários sem backend próprio
- autenticação via GitHub
- integração natural com o ecossistema open-source

---

# Decisões de design

Algumas decisões arquiteturais importantes do projeto.

## Conteúdo em MDX

MDX permite combinar Markdown com componentes React, mantendo os artigos simples de escrever e ao mesmo tempo flexíveis.

## Sem banco de dados

O projeto inicialmente considerou o uso de banco de dados e ORM (como Prisma), mas essa abordagem foi descartada por adicionar complexidade desnecessária para um blog pessoal.

A arquitetura atual baseada em arquivos MDX é mais simples e suficiente para o propósito do projeto.

## Comentários externos

Em vez de construir um sistema próprio de comentários, o projeto utiliza Giscus para reduzir manutenção e infraestrutura.

---

# Desenvolvimento

Instalar dependências:

```
npm install
```

Executar servidor de desenvolvimento:

```
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

# Criando novos posts

Para criar um novo artigo:

1. Criar um arquivo `.mdx` em

```
content/posts
```

2. Adicionar o frontmatter

3. Escrever o conteúdo em Markdown ou MDX

Os posts são automaticamente carregados pelo sistema.

---

# Deploy

O projeto pode ser hospedado em qualquer plataforma compatível com Next.js.

Plataforma recomendada:

Vercel

Build:

```
npm run build
npm start
```

---

# Roadmap

Possíveis melhorias futuras.

- busca avançada de posts
- página dedicada para tags
- geração de RSS
- melhorias de SEO
- indexação de conteúdo

---

# Autor

Bryan Alvarenga

GitHub  
https://github.com/bryancalvarenga

LinkedIn  
https://www.linkedin.com/in/bryanalvarenga/

---

# Licença

MIT
