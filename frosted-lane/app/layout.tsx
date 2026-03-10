import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frosted Lane | Frozen Curls & Desserts",
  description: "Fresh fruit curls, biscuit curls, waffles and refreshing drinks. The coolest destination for handcrafted frozen desserts.",
  keywords: "ice cream, frozen curls, desserts, waffles, drinks, frosted lane",
  openGraph: {
    title: "Frosted Lane | Frozen Curls & Desserts",
    description: "Fresh fruit curls, biscuit curls, waffles and refreshing drinks.",
    type: "website",
    siteName: "Frosted Lane",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
