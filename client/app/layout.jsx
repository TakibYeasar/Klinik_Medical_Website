import { Footer, Header } from '../components'
import './globals.css'
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { cn } from "../lib/utils";
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-dark-300 font-sans antialiased',
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
