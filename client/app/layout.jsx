"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Footer, Header } from '../components';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '../lib/utils';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/current_user/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
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
      <body className={cn('min-h-screen font-sans antialiased', inter.className)}>
        <Provider store={store}>
          <Header user={user} />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
