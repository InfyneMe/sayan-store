import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/components/cart-provider'

export const metadata: Metadata = {
  title: 'Loadzo',
  description: 'Created by infyne.in',
  generator: 'Bishal Deb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
