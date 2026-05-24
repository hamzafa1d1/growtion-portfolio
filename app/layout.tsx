import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Growtion — Des Créatives qui Transforment le Scroll en Achat",
  description:
    "Growtion crée des vidéos publicitaires, vidéos UGC et landing pages qui convertissent. Plus de 200 clients satisfaits, 1000+ créations réalisées.",
  keywords: ["vidéos publicitaires", "UGC", "landing page", "e-commerce", "ads", "Tunisie", "Growtion"],
  openGraph: {
    title: "Growtion — Sell Smart, Grow Faster",
    description: "Des créatives qui transforment le scroll en achat.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
