import type { Metadata } from 'next'
import { Inter, Heebo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const heebo = Heebo({ subsets: ["latin"], variable: "--font-heebo", display: "swap" });

export const metadata: Metadata = {
  title: 'CAPSULAND - Innovacion en Capsula Blanda',
  description: 'Fabricacion de capsulas blandas con estandares internacionales. Maquila, desarrollo, suplementos y medicamentos.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${heebo.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
