"use client";

import { Footer, Header } from '../components'
import './globals.css'
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { cn } from "../lib/utils";
import { useEffect, useState } from 'react';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/current_user/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-dark-300 font-sans antialiased',
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header user={user} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
