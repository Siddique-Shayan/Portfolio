import { Helmet } from 'react-helmet-async'
import { seo, profile, contact } from '@/data/portfolio.js'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  description: seo.description,
  url: seo.siteUrl,
  image: `${seo.siteUrl}${seo.image}`,
  email: `mailto:${contact.email}`,
  telephone: contact.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: contact.location,
  },
  sameAs: [contact.github, contact.linkedin].filter(Boolean),
  knowsAbout: seo.keywords,
}

export function SEO() {
  return (
    <Helmet>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords.join(', ')} />
      <meta name="author" content={seo.author} />
      <link rel="canonical" href={seo.siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.siteUrl} />
      <meta property="og:image" content={`${seo.siteUrl}${seo.image}`} />
      <meta property="og:site_name" content={profile.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={`${seo.siteUrl}${seo.image}`} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}
