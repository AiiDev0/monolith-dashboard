import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer"; // <-- Importar el footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monolith Dashboard",
  description: "Analiza y documenta tu API en segundos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-[#0a0a0c] text-gray-100 antialiased min-h-screen flex flex-col`}>
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}