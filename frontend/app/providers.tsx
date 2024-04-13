'use client'
// Import the necessary modules
import { ThemeProvider } from "next-themes";

// Define the Providers component
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    );
}
