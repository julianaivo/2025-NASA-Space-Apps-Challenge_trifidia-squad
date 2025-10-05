import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'

// Importe o seu ThemeProvider e o novo SimulationProvider
import { ThemeProvider } from "@/components/theme-provider"
import { SimulationProvider } from '@/contexts/SimulationContext'

import './globals.css'

export const metadata: Metadata = {
  title: 'Astroview - Simulador de Impacto', // Título atualizado para o seu projeto
  description: 'Simulador de Risco de Impacto de Asteroides - NASA Space Apps 2025',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {/* O ThemeProvider envolve tudo para gerir o tema escuro/claro */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* O SimulationProvider envolve tudo para partilhar o estado da simulação */}
          <SimulationProvider>
            {children}
          </SimulationProvider>
          
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}