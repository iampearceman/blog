import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
export const metadata: Metadata = {
  title: 'Emil\'s Blog',
  description: 'A blog built with Next.js and MDX',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body 
        className="max-w-[1000px] mx-auto"
        suppressHydrationWarning={true}
      >
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}