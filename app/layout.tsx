import type { Metadata } from "next";
import { Geist, Archivo } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/ui/MotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Heavy display face for headings — replaces the OS-dependent "Arial Black".
const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hamma-portfolio.vercel.app"),
  title: "Growtion — Des Créatives qui Transforment le Scroll en Achat",
  description:
    "Growtion crée des vidéos publicitaires, vidéos UGC et vidéos de tournage qui convertissent. Plus de 200 clients satisfaits, 1000+ créations réalisées.",
  keywords: ["vidéos publicitaires", "UGC", "tournage", "e-commerce", "ads", "Tunisie", "Growtion"],
  openGraph: {
    title: "Growtion — Sell Smart, Grow Faster",
    description: "Des créatives qui transforment le scroll en achat.",
    type: "website",
    locale: "fr_FR",
    siteName: "Growtion",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growtion — Sell Smart, Grow Faster",
    description: "Des créatives qui transforment le scroll en achat.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
