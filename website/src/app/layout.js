import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import PageLoader from "@/components/PageLoader";

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
      <body className="font-body min-h-screen flex flex-col">
        <LanguageProvider>
          <TooltipProvider>
            <PageLoader />
            {children}
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
