import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

// Body font
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// High-end display font for headings
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "TechNoir | Premium Gadget Store",
  description: "Curated tech essentials for the modern workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* We apply both font variables, and set the default text to a very dark grey (neutral-900) 
        on a pure white background. 
      */}
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-white text-neutral-900 antialiased selection:bg-black selection:text-white`}>
        <Header />
        <main className="w-full min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
