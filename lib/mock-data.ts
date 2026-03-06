import type { Post, User, Comment, Reaction, Tag } from '@/types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin Author',
    username: 'admin',
    email: 'admin@commitlog.dev',
    avatarUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=AA',
    provider: 'github',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Maria Silva',
    username: 'mariasilva',
    email: 'maria@example.com',
    avatarUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=MS',
    provider: 'github',
    role: 'user',
  },
  {
    id: '3',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    avatarUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=JD',
    provider: 'local',
    role: 'user',
  },
]

const mdContent1 = `
## Introduction

Building a modern web application requires careful consideration of your tech stack. In this post, we'll explore how to set up a Next.js project with TypeScript and Tailwind CSS.

## Installation

First, create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind
cd my-app
\`\`\`

## Project Structure

After installation, your project will look like this:

\`\`\`
my-app/
  app/
    layout.tsx
    page.tsx
  components/
  lib/
  public/
\`\`\`

## Configuration

### TypeScript Config

The \`tsconfig.json\` is pre-configured with path aliases:

\`\`\`json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
\`\`\`

### Tailwind Setup

Tailwind 4 uses a CSS-first configuration approach. Your \`globals.css\` becomes the primary config file.

## Building Components

Create reusable components using the component pattern:

\`\`\`tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export function Button({ variant = 'primary', children }: ButtonProps) {
  return (
    <button className={variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'}>
      {children}
    </button>
  )
}
\`\`\`

## Deployment

Deploy to Vercel with a single command:

\`\`\`bash
vercel deploy
\`\`\`

## Conclusion

This stack provides an excellent developer experience with type safety, utility-first CSS, and server-side rendering out of the box.
`

const mdContent2 = `
## What are React Server Components?

React Server Components (RSC) represent a fundamental shift in how we think about React applications. They allow components to run exclusively on the server.

## Key Benefits

### Reduced Bundle Size

Server Components don't ship JavaScript to the client. This means your bundle stays lean even as your application grows.

### Direct Backend Access

\`\`\`tsx
async function PostList() {
  const posts = await db.query('SELECT * FROM posts ORDER BY created_at DESC')
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
\`\`\`

### Streaming and Suspense

Server Components work seamlessly with Suspense boundaries:

\`\`\`tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <PostList />
    </Suspense>
  )
}
\`\`\`

## Client vs Server

Use the \`"use client"\` directive when you need:

- Event handlers (onClick, onChange)
- State (useState, useReducer)
- Effects (useEffect)
- Browser APIs

## Migration Strategy

Start by converting leaf components to Server Components first, then work your way up the tree.

## Conclusion

Server Components are not a replacement for client components. They're a new tool that lets you choose the right rendering strategy per component.
`

const mdContent3 = `
## Why TypeScript?

TypeScript adds static type checking to JavaScript, catching errors at compile time rather than runtime.

## Getting Started

### Basic Types

\`\`\`typescript
// Primitive types
let name: string = 'John'
let age: number = 30
let isActive: boolean = true

// Arrays
let tags: string[] = ['react', 'typescript']

// Objects
interface User {
  id: number
  name: string
  email: string
}
\`\`\`

### Generics

Generics allow you to create reusable components that work with multiple types:

\`\`\`typescript
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0]
}

const first = getFirst([1, 2, 3]) // number
const firstStr = getFirst(['a', 'b']) // string
\`\`\`

## Advanced Patterns

### Discriminated Unions

\`\`\`typescript
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string }

function handleResult(result: Result<User>) {
  if (result.success) {
    console.log(result.data.name)
  } else {
    console.error(result.error)
  }
}
\`\`\`

### Template Literal Types

\`\`\`typescript
type EventName = 'click' | 'focus' | 'blur'
type Handler = \`on\${Capitalize<EventName>}\`
// 'onClick' | 'onFocus' | 'onBlur'
\`\`\`

## TypeScript with React

Use TypeScript for props, state, and hooks for maximum safety.

## Conclusion

TypeScript is an investment that pays dividends as your codebase grows.
`

const mdContent4 = `
## The Problem with REST

REST APIs have served us well, but they come with inherent limitations: over-fetching, under-fetching, and the need for multiple round trips.

## Enter tRPC

tRPC lets you build fully typesafe APIs without schemas or code generation.

## Setup

\`\`\`typescript
import { initTRPC } from '@trpc/server'

const t = initTRPC.create()

const appRouter = t.router({
  getUser: t.procedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return getUserById(input.id)
    }),
})
\`\`\`

## Client Usage

\`\`\`typescript
const user = await trpc.getUser.query({ id: '1' })
// TypeScript knows the exact shape of user
\`\`\`

## Comparison with GraphQL

### tRPC Advantages

- Zero code generation
- Simpler mental model
- Built for TypeScript

### GraphQL Advantages

- Language agnostic
- Schema-first design
- Federation support

## When to Use tRPC

tRPC shines in full-stack TypeScript projects where both client and server share a codebase.

## Conclusion

Choose the right tool for your needs. tRPC is excellent for TypeScript-heavy projects.
`

const mdContent5 = `
## Why Edge Functions?

Edge Functions run your code at the network edge, closer to your users. This means lower latency and faster responses.

## Vercel Edge Runtime

\`\`\`typescript
export const config = {
  runtime: 'edge',
}

export default function handler(req: Request) {
  return new Response('Hello from the Edge!')
}
\`\`\`

## Use Cases

### Geolocation-based Content

\`\`\`typescript
export default function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US'
  return NextResponse.rewrite(new URL(\`/\${country}\`, request.url))
}
\`\`\`

### A/B Testing

Run experiments at the edge without client-side flicker.

### Authentication

Validate tokens before they even reach your origin server.

## Limitations

- Limited API surface
- No Node.js-specific modules
- Execution time limits

## Performance Comparison

Edge functions typically respond in 50-100ms globally, compared to 200-500ms for regional serverless functions.

## Conclusion

Edge computing is the future. Start moving your latency-sensitive logic to the edge today.
`

const mdContent6 = `
## What is a Design System?

A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.

## Core Principles

### Consistency

Every component should look and behave the same across your entire application.

### Composability

Components should be composable, allowing you to build complex UIs from simple building blocks.

### Accessibility

All components must meet WCAG 2.1 AA standards at minimum.

## Building with Tailwind

\`\`\`tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        outline: 'border border-input bg-background',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
  }
)
\`\`\`

## Documentation

### Storybook

Use Storybook to document and test your components in isolation.

### Design Tokens

Define your design tokens in CSS custom properties for maximum flexibility.

## Versioning

Semantic versioning ensures consumers know when breaking changes occur.

## Conclusion

A well-built design system accelerates development and ensures consistency across teams.
`

const mdContent7 = `
## Introduction to Testing

Testing is not optional in production applications. It's the safety net that lets you refactor with confidence.

## Testing Pyramid

### Unit Tests

Test individual functions and components in isolation.

\`\`\`typescript
import { render, screen } from '@testing-library/react'

test('renders greeting', () => {
  render(<Greeting name="World" />)
  expect(screen.getByText('Hello, World!')).toBeInTheDocument()
})
\`\`\`

### Integration Tests

Test how multiple components work together.

### End-to-End Tests

\`\`\`typescript
import { test, expect } from '@playwright/test'

test('user can log in', async ({ page }) => {
  await page.goto('/login')
  await page.fill('[name=email]', 'user@example.com')
  await page.fill('[name=password]', 'password')
  await page.click('button[type=submit]')
  await expect(page).toHaveURL('/dashboard')
})
\`\`\`

## Tools

- **Vitest**: Fast unit testing
- **Testing Library**: Component testing
- **Playwright**: E2E testing
- **MSW**: API mocking

## Best Practices

Write tests that resemble how users interact with your software.

## Conclusion

Invest in testing early. The cost of bugs in production far exceeds the cost of writing tests.
`

const mdContent8 = `
## What is CI/CD?

Continuous Integration and Continuous Deployment automate the process of testing and deploying your code.

## GitHub Actions

\`\`\`yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test
      - run: npm run build
\`\`\`

## Deployment Strategies

### Blue-Green Deployment

Maintain two identical environments and switch traffic between them.

### Canary Releases

Roll out changes to a small percentage of users first.

### Preview Deployments

Vercel automatically creates preview deployments for every pull request.

## Monitoring

### Error Tracking

Use tools like Sentry to catch errors in production.

### Performance Monitoring

Track Core Web Vitals and set performance budgets.

## Rollback Strategy

Always have a plan to roll back. Automated rollbacks based on error rate spikes are ideal.

## Conclusion

A solid CI/CD pipeline is the backbone of any modern software development workflow.
`

const mdContent9 = `
## Why Markdown?

Markdown is the lingua franca of developer documentation. It's simple, portable, and widely supported.

## MDX: Markdown + JSX

MDX lets you use React components inside your markdown:

\`\`\`mdx
import { Chart } from './Chart'

# Sales Report

Here's our quarterly performance:

<Chart data={salesData} />
\`\`\`

## Rendering Markdown in React

### Using remark and rehype

\`\`\`typescript
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'

const result = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(rehypeStringify)
  .process(markdown)
\`\`\`

## Syntax Highlighting

Use libraries like Shiki or Prism for syntax highlighting:

### Shiki

Server-side highlighting with VS Code-quality themes.

### Prism

Client-side highlighting with a smaller bundle.

## Content Collections

Organize your content in a structured way with frontmatter:

\`\`\`yaml
---
title: My Post
date: 2026-01-15
tags: [react, mdx]
---
\`\`\`

## Conclusion

Markdown and MDX provide the perfect balance of simplicity and power for content-driven sites.
`

const mdContent10 = `
## The Performance Problem

Modern web apps often ship megabytes of JavaScript. Users on slow connections suffer the most.

## Core Web Vitals

### Largest Contentful Paint (LCP)

Target: under 2.5 seconds. Optimize images, fonts, and above-the-fold content.

### First Input Delay (FID)

Target: under 100ms. Minimize JavaScript execution and break up long tasks.

### Cumulative Layout Shift (CLS)

Target: under 0.1. Always set dimensions on images and embeds.

## Optimization Techniques

### Code Splitting

\`\`\`typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
})
\`\`\`

### Image Optimization

\`\`\`tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  alt="Hero image"
  priority
/>
\`\`\`

### Font Optimization

Use \`next/font\` to self-host fonts with zero layout shift.

## Measuring Performance

Use Lighthouse, WebPageTest, and Real User Monitoring (RUM) for comprehensive performance analysis.

## Conclusion

Performance is a feature, not an afterthought. Every millisecond counts.
`

const mdContent11 = `
## What is Accessibility?

Web accessibility means making your website usable by everyone, including people with disabilities.

## WCAG Guidelines

### Perceivable

Content must be presentable in ways users can perceive.

### Operable

UI components must be operable by keyboard and assistive technologies.

### Understandable

Information and UI operation must be understandable.

### Robust

Content must be robust enough to work with current and future technologies.

## Practical Implementation

### Semantic HTML

\`\`\`html
<!-- Bad -->
<div onclick="submit()">Submit</div>

<!-- Good -->
<button type="submit">Submit</button>
\`\`\`

### ARIA Attributes

\`\`\`tsx
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
\`\`\`

### Focus Management

Ensure logical focus order and visible focus indicators.

## Testing Accessibility

- **axe DevTools**: Automated accessibility testing
- **Screen readers**: Manual testing with NVDA or VoiceOver
- **Keyboard navigation**: Test all interactive elements

## Conclusion

Accessibility is not a nice-to-have. It's a requirement for building inclusive products.
`

const mdContent12 = `
## Why Database Design Matters

A well-designed database is the foundation of every successful application. Poor design leads to performance issues, data integrity problems, and developer frustration.

## Choosing Your Database

### PostgreSQL

The gold standard for relational data. Use when you need:

- Complex queries and joins
- ACID transactions
- Full-text search

### SQLite

Perfect for embedded and serverless applications:

\`\`\`typescript
import Database from 'better-sqlite3'
const db = new Database('app.db')
\`\`\`

## Schema Design

### Normalization

Reduce data redundancy through normalization:

\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Indexes

Add indexes to frequently queried columns:

\`\`\`sql
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_created ON posts(created_at DESC);
\`\`\`

## ORM vs Raw SQL

### Prisma

\`\`\`typescript
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' },
  include: { posts: true },
})
\`\`\`

### Drizzle

\`\`\`typescript
const result = await db.select().from(users).where(eq(users.email, 'user@example.com'))
\`\`\`

## Migrations

Always use migrations to manage schema changes. Never modify production databases manually.

## Conclusion

Invest time in database design upfront. It will save you countless hours of refactoring later.
`

export const mockPosts: Post[] = [
  {
    id: '1',
    slug: 'building-modern-web-apps-nextjs-typescript',
    title: 'Building Modern Web Apps with Next.js and TypeScript',
    excerpt: 'A comprehensive guide to setting up a production-ready Next.js project with TypeScript, Tailwind CSS, and best practices.',
    contentMd: mdContent1,
    publishedAt: '2026-03-01',
    readingTime: 8,
    tags: ['nextjs', 'typescript', 'tailwindcss'],
    category: 'Tutorial',
  },
  {
    id: '2',
    slug: 'understanding-react-server-components',
    title: 'Understanding React Server Components',
    excerpt: 'Deep dive into React Server Components, how they work, and when to use them in your Next.js applications.',
    contentMd: mdContent2,
    publishedAt: '2026-02-25',
    readingTime: 12,
    tags: ['react', 'nextjs', 'server-components'],
    category: 'Deep Dive',
  },
  {
    id: '3',
    slug: 'typescript-patterns-for-react-developers',
    title: 'TypeScript Patterns for React Developers',
    excerpt: 'Essential TypeScript patterns every React developer should know, from generics to discriminated unions.',
    contentMd: mdContent3,
    publishedAt: '2026-02-20',
    readingTime: 10,
    tags: ['typescript', 'react', 'patterns'],
    category: 'Tutorial',
  },
  {
    id: '4',
    slug: 'building-typesafe-apis-with-trpc',
    title: 'Building Type-Safe APIs with tRPC',
    excerpt: 'Learn how to build end-to-end type-safe APIs without schemas or code generation using tRPC.',
    contentMd: mdContent4,
    publishedAt: '2026-02-15',
    readingTime: 9,
    tags: ['trpc', 'typescript', 'api'],
    category: 'Tutorial',
  },
  {
    id: '5',
    slug: 'edge-computing-with-vercel',
    title: 'Edge Computing with Vercel Edge Functions',
    excerpt: 'Explore how edge functions can dramatically reduce latency and improve user experience in your applications.',
    contentMd: mdContent5,
    publishedAt: '2026-02-10',
    readingTime: 7,
    tags: ['vercel', 'edge', 'performance'],
    category: 'Architecture',
  },
  {
    id: '6',
    slug: 'design-systems-with-tailwind-and-cva',
    title: 'Building Design Systems with Tailwind and CVA',
    excerpt: 'How to create a scalable, consistent design system using Tailwind CSS and Class Variance Authority.',
    contentMd: mdContent6,
    publishedAt: '2026-02-05',
    readingTime: 11,
    tags: ['tailwindcss', 'design-system', 'react'],
    category: 'Architecture',
  },
  {
    id: '7',
    slug: 'testing-react-apps-comprehensive-guide',
    title: 'Testing React Applications: A Comprehensive Guide',
    excerpt: 'From unit tests to E2E, learn how to build a robust testing strategy for your React applications.',
    contentMd: mdContent7,
    publishedAt: '2026-01-28',
    readingTime: 14,
    tags: ['testing', 'react', 'playwright'],
    category: 'Tutorial',
  },
  {
    id: '8',
    slug: 'cicd-pipelines-for-frontend',
    title: 'CI/CD Pipelines for Frontend Projects',
    excerpt: 'Set up automated testing and deployment pipelines for your frontend projects using GitHub Actions.',
    contentMd: mdContent8,
    publishedAt: '2026-01-20',
    readingTime: 8,
    tags: ['cicd', 'github-actions', 'devops'],
    category: 'DevOps',
  },
  {
    id: '9',
    slug: 'markdown-mdx-content-driven-sites',
    title: 'Markdown and MDX for Content-Driven Sites',
    excerpt: 'How to leverage Markdown and MDX to build powerful content-driven websites with React components.',
    contentMd: mdContent9,
    publishedAt: '2026-01-15',
    readingTime: 9,
    tags: ['markdown', 'mdx', 'content'],
    category: 'Tutorial',
  },
  {
    id: '10',
    slug: 'web-performance-optimization-guide',
    title: 'Web Performance Optimization Guide',
    excerpt: 'Practical techniques to improve Core Web Vitals and deliver fast web experiences to every user.',
    contentMd: mdContent10,
    publishedAt: '2026-01-10',
    readingTime: 10,
    tags: ['performance', 'web-vitals', 'optimization'],
    category: 'Performance',
  },
  {
    id: '11',
    slug: 'web-accessibility-practical-guide',
    title: 'Web Accessibility: A Practical Guide',
    excerpt: 'Make your web applications accessible to everyone with these practical WCAG implementation techniques.',
    contentMd: mdContent11,
    publishedAt: '2026-01-05',
    readingTime: 11,
    tags: ['accessibility', 'a11y', 'html'],
    category: 'Best Practices',
  },
  {
    id: '12',
    slug: 'database-design-for-web-developers',
    title: 'Database Design for Web Developers',
    excerpt: 'Everything you need to know about designing databases for modern web applications, from schemas to ORMs.',
    contentMd: mdContent12,
    publishedAt: '2025-12-28',
    readingTime: 13,
    tags: ['database', 'postgresql', 'prisma'],
    category: 'Architecture',
  },
]

export const mockComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    author: mockUsers[1],
    body: 'Great article! The section on project structure was very helpful.',
    createdAt: '2026-03-02T10:30:00Z',
  },
  {
    id: '2',
    postId: '1',
    author: mockUsers[2],
    body: 'I have been using this stack for 6 months and can confirm it is excellent for production apps.',
    createdAt: '2026-03-02T14:15:00Z',
  },
  {
    id: '3',
    postId: '2',
    author: mockUsers[1],
    body: 'Server Components changed how I think about React. Thanks for the clear explanation!',
    createdAt: '2026-02-26T09:00:00Z',
  },
  {
    id: '4',
    postId: '2',
    author: mockUsers[2],
    body: 'The migration strategy section was exactly what I needed. We are converting our app now.',
    createdAt: '2026-02-27T11:45:00Z',
  },
  {
    id: '5',
    postId: '3',
    author: mockUsers[1],
    body: 'Discriminated unions are a game changer for error handling patterns.',
    createdAt: '2026-02-21T16:20:00Z',
  },
]

export const mockReactions: Reaction[] = [
  { postId: '1', type: 'like', count: 42, viewerHasReacted: false },
  { postId: '1', type: 'love', count: 18, viewerHasReacted: false },
  { postId: '1', type: 'fire', count: 7, viewerHasReacted: false },
  { postId: '2', type: 'like', count: 65, viewerHasReacted: false },
  { postId: '2', type: 'love', count: 31, viewerHasReacted: false },
  { postId: '2', type: 'fire', count: 22, viewerHasReacted: false },
  { postId: '3', type: 'like', count: 38, viewerHasReacted: false },
  { postId: '3', type: 'love', count: 12, viewerHasReacted: false },
  { postId: '3', type: 'fire', count: 5, viewerHasReacted: false },
  { postId: '4', type: 'like', count: 29, viewerHasReacted: false },
  { postId: '4', type: 'love', count: 8, viewerHasReacted: false },
  { postId: '4', type: 'fire', count: 15, viewerHasReacted: false },
  { postId: '5', type: 'like', count: 51, viewerHasReacted: false },
  { postId: '5', type: 'love', count: 23, viewerHasReacted: false },
  { postId: '5', type: 'fire', count: 19, viewerHasReacted: false },
  { postId: '6', type: 'like', count: 33, viewerHasReacted: false },
  { postId: '6', type: 'love', count: 14, viewerHasReacted: false },
  { postId: '6', type: 'fire', count: 9, viewerHasReacted: false },
  { postId: '7', type: 'like', count: 27, viewerHasReacted: false },
  { postId: '7', type: 'love', count: 11, viewerHasReacted: false },
  { postId: '7', type: 'fire', count: 4, viewerHasReacted: false },
  { postId: '8', type: 'like', count: 19, viewerHasReacted: false },
  { postId: '8', type: 'love', count: 6, viewerHasReacted: false },
  { postId: '8', type: 'fire', count: 3, viewerHasReacted: false },
  { postId: '9', type: 'like', count: 35, viewerHasReacted: false },
  { postId: '9', type: 'love', count: 16, viewerHasReacted: false },
  { postId: '9', type: 'fire', count: 11, viewerHasReacted: false },
  { postId: '10', type: 'like', count: 44, viewerHasReacted: false },
  { postId: '10', type: 'love', count: 20, viewerHasReacted: false },
  { postId: '10', type: 'fire', count: 17, viewerHasReacted: false },
  { postId: '11', type: 'like', count: 39, viewerHasReacted: false },
  { postId: '11', type: 'love', count: 25, viewerHasReacted: false },
  { postId: '11', type: 'fire', count: 8, viewerHasReacted: false },
  { postId: '12', type: 'like', count: 31, viewerHasReacted: false },
  { postId: '12', type: 'love', count: 10, viewerHasReacted: false },
  { postId: '12', type: 'fire', count: 6, viewerHasReacted: false },
]

export const mockTags: Tag[] = [
  { slug: 'nextjs', name: 'Next.js', postCount: 3 },
  { slug: 'typescript', name: 'TypeScript', postCount: 3 },
  { slug: 'react', name: 'React', postCount: 4 },
  { slug: 'tailwindcss', name: 'Tailwind CSS', postCount: 2 },
  { slug: 'server-components', name: 'Server Components', postCount: 1 },
  { slug: 'patterns', name: 'Patterns', postCount: 1 },
  { slug: 'trpc', name: 'tRPC', postCount: 1 },
  { slug: 'api', name: 'API', postCount: 1 },
  { slug: 'vercel', name: 'Vercel', postCount: 1 },
  { slug: 'edge', name: 'Edge', postCount: 1 },
  { slug: 'performance', name: 'Performance', postCount: 2 },
  { slug: 'design-system', name: 'Design System', postCount: 1 },
  { slug: 'testing', name: 'Testing', postCount: 1 },
  { slug: 'playwright', name: 'Playwright', postCount: 1 },
  { slug: 'cicd', name: 'CI/CD', postCount: 1 },
  { slug: 'github-actions', name: 'GitHub Actions', postCount: 1 },
  { slug: 'devops', name: 'DevOps', postCount: 1 },
  { slug: 'markdown', name: 'Markdown', postCount: 1 },
  { slug: 'mdx', name: 'MDX', postCount: 1 },
  { slug: 'content', name: 'Content', postCount: 1 },
  { slug: 'web-vitals', name: 'Web Vitals', postCount: 1 },
  { slug: 'optimization', name: 'Optimization', postCount: 1 },
  { slug: 'accessibility', name: 'Accessibility', postCount: 1 },
  { slug: 'a11y', name: 'a11y', postCount: 1 },
  { slug: 'html', name: 'HTML', postCount: 1 },
  { slug: 'database', name: 'Database', postCount: 1 },
  { slug: 'postgresql', name: 'PostgreSQL', postCount: 1 },
  { slug: 'prisma', name: 'Prisma', postCount: 1 },
]
