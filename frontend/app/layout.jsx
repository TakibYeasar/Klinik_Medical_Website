'use client';

import { Provider } from 'react-redux';
import { Inter } from 'next/font/google';
import { store } from '../store/store';
import { Footer, Header } from '../components';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <style>{`:root { --font-inter: ${inter.variable}; }`}</style>
        </head>
        <body className="min-h-screen font-sans antialiased">
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </Provider>
  );
}