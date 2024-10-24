'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Footer, Header } from '../components';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '../lib/utils';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import { fetchCurrentUser } from '../redux/features/auth/authApi';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

function Layout({ children }) {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check for the authToken object in localStorage
    const authToken = JSON.parse(localStorage.getItem('authToken'));
    if (authToken && authToken.access_token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className={cn('min-h-screen font-sans antialiased', inter.className)}>
      {/* Pass user and isAuthenticated props to Header */}
      <Header user={user} isAuthenticated={isAuthenticated} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
