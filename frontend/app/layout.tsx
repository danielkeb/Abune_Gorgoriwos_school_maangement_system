import * as React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppWrapper } from '@/components/context/UserContext';
import { Providers } from './providers';
//import ThemeSwitch from '@/components/context/ThemeSwitch';

// Initialize Inter font
const inter = Inter({ subsets: ['latin'] });

// Define metadata
export const metadata: Metadata = {
  title: 'AGSMS',
  description: 'Developed by 2BD',
};

// Define RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the content with Providers and AppWrapper */}
        <Providers>
          <AppWrapper>
            {children}
            {/* Render ThemeSwitch component */}
            <div style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              zIndex: 9999,
            }}>
              {/* <ThemeSwitch /> */}
            </div>
          </AppWrapper>
        </Providers>
      </body>
    </html>
  );
}
