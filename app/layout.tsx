import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import localFont from 'next/font/local'

// Local fonts (from public/fonts)
const Coolvetica = localFont({
  src: [
    { path: '../public/fonts/Coolvetica/Coolvetica-Hv-Comp.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Coolvetica/Coolvetica-Rg.otf', weight: '700', style: 'bold' },
  ],
  variable: '--font-coolvetica',
  display: 'swap',
})
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
  <body className={`font-sans ${Coolvetica.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
