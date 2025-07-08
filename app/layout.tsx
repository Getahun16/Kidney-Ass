"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/images/img.png" />

        {/* Primary Meta Tags */}
        <title>
          Ethiopian Kidney Association (EKA) | Kidney Health Awareness Ethiopia
        </title>
        <meta
          name="description"
          content="Ethiopian Kidney Association (EKA) is dedicated to raising awareness, prevention, and care for kidney health in Ethiopia. Join us to make a difference."
        />
        <meta
          name="keywords"
          content="Kidney Health Ethiopia, Ethiopian Kidney Association, EKA, Hypertension, Nephrology Ethiopia, Kidney Awareness, Kidney Disease Ethiopia"
        />
        <meta name="author" content="Ethiopian Kidney Association (EKA)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="Ethiopian Kidney Association (EKA)"
        />
        <meta
          property="og:description"
          content="Promoting kidney health, awareness, and saving lives in Ethiopia through the Ethiopian Kidney Association (EKA)."
        />
        <meta property="og:image" content="/images/img.png" />
        <meta property="og:url" content="https://www.yourdomain.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Ethiopian Kidney Association (EKA)"
        />
        <meta
          name="twitter:description"
          content="EKA is advancing kidney health and awareness in Ethiopia."
        />
        <meta name="twitter:image" content="/images/img.png" />
      </head>

      <body>
        {!isAdmin && <Navbar />}
        {children}
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
