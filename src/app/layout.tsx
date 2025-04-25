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
    <html lang="en" className='scrollbar-hide'>
      <body className="min-h-screen bg-slate-900 max-w-7xl mx-auto flex flex-col">
        <Providers>
          <Suspense fallback={<Loading />}>
            <DeviceWrapper>
              <div className="background-gradient absolute inset-0 -z-50 max-h-screen opacity-40" />
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </DeviceWrapper>
          </Suspense>
        </Providers>
      </body>
    </html>
  )

}