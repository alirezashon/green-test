import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '../components/provider'

export const metadata: Metadata = {
  title: 'داشبورد DummyJSON',
  description: 'داشبورد برای API DummyJSON',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='fa' dir='rtl'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
