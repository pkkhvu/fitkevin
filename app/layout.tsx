import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kevin's Calorie Counter",
  description: "Created because I'm not paying a $10 subscription monthly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white-100">
      <main className="text-base">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </main>
    </html>
  );
}
