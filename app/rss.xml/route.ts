export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>commitlog</title>
    <link>https://commitlog.com.br</link>
    <description>O commitlog.com.br é um blog pessoal onde registro minha jornada aprendendo e explorando desenvolvimento de software.</description>
    <language>pt-BR</language>
    <atom:link href="https://commitlog.com.br/rss.xml" rel="self" type="application/rss+xml"/>
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
