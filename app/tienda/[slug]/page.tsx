import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductDetailClient from "@/components/product-detail-client"
import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { globalSettingsQuery, productBySlugQuery } from "@/sanity/lib/queries"

// Force dynamic fetch
export const revalidate = 0

export default async function ProductDetailPage(props: any) {
  const params = await props.params;
  const slug = params?.slug;

  if (!slug) {
    notFound()
  }

  // Query product details from Sanity, related products, and global settings in parallel
  const relatedQuery = `*[_type == "product" && slug.current != $slug][0...4] {
    referencia,
    slug,
    registroInvima,
    "gallery": gallery[].asset->url
  }`

  const [product, relatedProducts, settings] = await Promise.all([
    client.fetch(productBySlugQuery, { slug }),
    client.fetch(relatedQuery, { slug }),
    client.fetch(globalSettingsQuery)
  ])

  if (!product) {
    notFound()
  }

  return (
    <main>
      <Header settings={settings} />

      {/* Breadcrumb */}
      <nav className="pt-24 pb-4 bg-white border-b border-charcoal/5" aria-label="Navegación">
        <div className="mx-auto max-w-7xl px-6">
          <ol className="flex items-center gap-2 text-sm text-charcoal/50">
            <li>
              <Link href="/" className="hover:text-teal transition-colors flex items-center gap-1">
                <Icon icon="ph:house-light" className="w-3.5 h-3.5" />
                Inicio
              </Link>
            </li>
            <Icon icon="ph:caret-right-light" className="w-3 h-3 text-charcoal/30" />
            <li>
              <Link href="/tienda" className="hover:text-teal transition-colors flex items-center gap-1">
                <Icon icon="ph:storefront-light" className="w-3.5 h-3.5" />
                Tienda
              </Link>
            </li>
            <Icon icon="ph:caret-right-light" className="w-3 h-3 text-charcoal/30" />
            <li className="text-charcoal font-medium truncate max-w-[200px]">
              {product.referencia}
            </li>
          </ol>
        </div>
      </nav>

      <ProductDetailClient product={product} relatedProducts={relatedProducts} />

      <Footer settings={settings} />
    </main>
  )
}

