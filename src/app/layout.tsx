import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from './context/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MavaPay',
  description: 'mavapay',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full '>
      <AuthProvider>
        <body className={`${inter.className} h-full`}>
          <div className='h-full'>
            {children}
          </div>
        </body>
      </AuthProvider>
    </html>
  )
}
