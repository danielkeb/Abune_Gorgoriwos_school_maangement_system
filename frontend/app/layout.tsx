import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppWrapper } from '@/components/context/UserContext'
import { AppGetter } from './context/toget'


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
     <AppGetter>
    
     <AppWrapper>
     {children}
     </AppWrapper>
     </AppGetter> 
      
        
        </body>
    </html>
  );
}
