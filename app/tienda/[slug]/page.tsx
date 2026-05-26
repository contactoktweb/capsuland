import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductDetailClient from "@/components/product-detail-client"
import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Icon } from "@iconify/react"

// Force dynamic fetch
export const revalidate = 0

interface PageProps {
  params: {
    slug: string
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = params

  // Query product details from Sanity
  const productQuery = `*[_type == "product" && slug.current == $slug][0]`
  const product = await client.fetch(productQuery, { slug })

  if (!product) {
    notFound()
  }

  // Fetch related products (e.g. up to 4 other products of same or different categories)
  const relatedQuery = `*[_type == "product" && slug.current != $slug][0...4]`
  const relatedProducts = await client.fetch(relatedQuery, { slug })

  return (
    <main>
      <Header />

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

      <Footer />
    </main>
  )
}

