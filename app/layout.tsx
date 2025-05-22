import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { ThemeProvider } from './providers'
import AccessibilityMenu from '@/components/ui/AccessibilityMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BeyondChat Admin Panel',
  description: 'An AI-powered customer communication platform',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <AccessibilityMenu />
        </ThemeProvider>
      </body>
    </html>
  )
}
