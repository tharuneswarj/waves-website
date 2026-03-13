import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, DM_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CartHydration from "@/components/CartHydration";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "optional",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://waves.company"),
  title: {
    default: "Waves Company",
    template: "%s — Waves Company",
  },
  description:
    "Lighting objects designed through code, material honesty, and human touch.",
  openGraph: {
    title: "Waves Company",
    description:
      "Lighting objects designed through code, material honesty, and human touch.",
    url: "https://waves.company",
    siteName: "Waves Company",
    images: [
      {
        url: "/logos/Cream_and_Blue_Logo_v2.png",
        width: 1200,
        height: 630,
        alt: "Waves Company",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/logos/Favicon_Logo.png",
    apple: "/logos/Favicon_Logo.png",
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
        className={`${dmSerifDisplay.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <CartHydration />
        <Header />
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
