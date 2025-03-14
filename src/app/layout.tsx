import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Main/Navigation/Navbar'
import Footer from '@/components/Main/Footer/Footer'
import { Providers } from '@/components/Providers'
import { Suspense } from 'react'
import Loading from '@/components/Loading/Loading'
import DeviceWrapper from '@/components/DeviceWrapper'


export const metadata: Metadata = {
  title: 'The Universe of Cryptocurrency',
  description: 'Cryptocurrency real time data, information and DEX',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 max-w-7xl mx-auto">
        <Providers>
          <Suspense fallback={<Loading />}>
            <DeviceWrapper>
              <Navbar />
              {children}
              <Footer />
            </DeviceWrapper>
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}