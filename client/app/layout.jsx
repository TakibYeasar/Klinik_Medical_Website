import { Footer, Header } from '../components'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />{children}<Footer />
      </body>
    </html>
  )
}
