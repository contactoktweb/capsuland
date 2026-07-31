import type { Metadata } from 'next'
import { Inter, Heebo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const heebo = Heebo({ subsets: ["latin"], variable: "--font-heebo", display: "swap" });

import { client } from "@/sanity/lib/client"
import { globalSettingsQuery } from "@/sanity/lib/queries"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(globalSettingsQuery)

  return {
    title: settings?.siteTitle || 'CAPSULAND - Innovacion en Capsula Blanda',
    description: settings?.siteDescription || 'Fabricacion de capsulas blandas con estandares internacionales. Maquila, desarrollo, suplementos y medicamentos.',
    icons: {
      icon: settings?.favicon ? settings.favicon : [
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
        { url: '/icon.svg', type: 'image/svg+xml' }
      ],
      apple: settings?.appleIcon ? settings.appleIcon : '/apple-icon.png',
    },
    other: {
      ...(settings?.seoGeo?.region ? { "geo.region": settings.seoGeo.region } : {}),
      ...(settings?.seoGeo?.placename ? { "geo.placename": settings.seoGeo.placename } : {}),
      ...(settings?.seoGeo?.position ? { "geo.position": settings.seoGeo.position, "ICBM": settings.seoGeo.position } : {}),
    }
  }
}


import { Toaster } from "sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${heebo.variable} antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
