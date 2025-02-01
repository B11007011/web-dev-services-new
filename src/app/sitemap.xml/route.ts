import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import sitemap from '../sitemap'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  const headersList = headers()
  const host = headersList.get('host') || ''
  
  const sitemapEntries = await sitemap()
  
  // Filter entries based on the current host
  const filteredEntries = sitemapEntries.filter(entry => 
    entry.url.includes(host)
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${filteredEntries.map(entry => `
        <url>
          <loc>${entry.url}</loc>
          <lastmod>${entry.lastModified}</lastmod>
          <changefreq>${entry.changeFrequency}</changefreq>
          <priority>${entry.priority}</priority>
        </url>
      `).join('')}
    </urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
} 