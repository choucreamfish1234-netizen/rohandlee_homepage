import Link from 'next/link'
import Script from 'next/script'

interface BreadcrumbItem {
  name: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `https://lawfirmrohandlee.com${item.href}` } : {}),
    })),
  }

  return (
    <>
      <Script
        id={`breadcrumb-${items.length}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="breadcrumb" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-400">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span>/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-[#1B3B2F] transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className="text-gray-600">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
