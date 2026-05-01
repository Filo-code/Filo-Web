import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { CookieBanner } from "@/components/layout/CookieBanner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://filo-ai.it"),
  title: {
    template: "%s | Filò",
    default: "Filò | Segretarie AI, lead intake e automazioni operative",
  },
  description:
    "Soluzioni AI per attività e professionisti: Galatea per appuntamenti beauty, Cricchetto per officine, Atlas per automazioni operative, Igea per studi e Hermes per lead intake.",
  keywords: [
    "automazione B2B",
    "AI per aziende",
    "software aziendale",
    "Filò",
    "gestione appuntamenti",
    "segretaria AI",
    "lead intake",
    "dashboard operativa",
    "AI per saloni",
    "AI per studi professionali",
    "lead generation",
    "n8n automations",
  ],
  authors: [{ name: "Filò" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Filò | Segretarie AI, lead intake e automazioni operative",
    description:
      "Galatea, Cricchetto, Atlas, Igea e Hermes: soluzioni AI per richieste, appuntamenti, officine, dashboard operative e workflow.",
    url: "https://filo-ai.it",
    siteName: "Filò",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Filò - Automazioni AI per aziende",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Filò | Segretarie AI, lead intake e automazioni operative",
    description:
      "Soluzioni AI per richieste, appuntamenti, lead intake, dashboard operative e automazioni di processo.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/Brand/filo_brand_favicon.png",
    shortcut: "/Brand/filo_brand_favicon.png",
    apple: "/Brand/filo_brand_favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-white/10 selection:text-white">
        {children}
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
