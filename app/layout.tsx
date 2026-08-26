import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const spaceMono = Space_Mono({ subsets: ['latin'], variable: '--font-space-mono', weight: ['400', '700'], display: 'swap' })

export const metadata: Metadata = {
  title: 'FROGITIVE — $FUG',
  description: 'FROGITIVE — The most wanted frog on Solana. Still at large.',
  generator: 'v0.app',
  openGraph: {
    title: 'FROGITIVE — $FUG',
    description: 'The most wanted frog on Solana. Still at large.',
    type: 'website',
    images: [{ url: '/images/frogitive-1.png', width: 1200, height: 1200, alt: 'FROGITIVE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FROGITIVE — $FUG',
    description: 'The most wanted frog on Solana. Still at large.',
    images: ['/images/frogitive-1.png'],
  },
  icons: { icon: '/images/frogitive-1.png', apple: '/images/frogitive-1.png' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050705',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${spaceMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
