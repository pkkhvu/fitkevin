import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Provider from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";

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
    <html lang="en" className="">
      <main className="text-base">
        <body className={inter.className}>
          <Provider>
            <ToasterContext />
            <Navbar />
            {children}
          </Provider>
        </body>
      </main>
    </html>
  );
}
