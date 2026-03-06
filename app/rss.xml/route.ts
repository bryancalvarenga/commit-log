export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>commit.log</title>
    <link>https://commitlog.dev</link>
    <description>A personal developer blog focused on web development, TypeScript, React, and modern software engineering.</description>
    <language>pt-BR</language>
    <atom:link href="https://commitlog.dev/rss.xml" rel="self" type="application/rss+xml"/>
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
