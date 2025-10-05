import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { SimulationProvider } from '@/contexts/SimulationContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'AstroView - Asteroid Impact Simulator',
  description: 'Platform for visualization and simulation of asteroid risks. Transform NASA and USGS data into interactive simulations.',
  generator: 'AstroView',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <SimulationProvider>
          {children}
        </SimulationProvider>
        <Analytics />
      </body>
    </html>
  )
}
