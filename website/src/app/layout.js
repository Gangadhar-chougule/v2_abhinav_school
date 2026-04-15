import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sant Dnyaneshwar Shikshan Sanstha | अभिनव मतिमंद मुलांची निवासी शाळा",
  description: "Empowering specially-abled children through dedicated education since 1998. Residential school for intellectually disabled children at Palus, Maharashtra.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} font-body min-h-screen flex flex-col`}>
        <LanguageProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
