import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Margarita Ivy: THE FOAL | Official Concept Archive",
  description: "Object No. 1. Site-specific intervention. Sector: Brno-Bystrc / C. Status: Active Phase. Taecar Archive Collection.",
  keywords: ["Margarita Ivy", "The Foal", "Conceptual Art", "Brno", "Taecar", "Karpuchina Gallery", "A Virtu", "Contemporary Art", "Site-specific"],
  authors: [{ name: "TAECAR ARCHIVE" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://thefoal.art/",
    title: "Margarita Ivy: THE FOAL",
    description: "Object No. 1 [Active]. Sector: Brno-Bystrc. Initiate Sequence.",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: "The Foal - Concept Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Margarita Ivy: THE FOAL",
    description: "Site-specific intervention. Sector: Brno-Bystrc. Status: Active.",
    images: ["/og-preview.png"],
  },
  themeColor: "#000000",
  icons: {
    icon: "/assets/images/Gemini_Generated_Image_yv2nytyv2nytyv2n.jpeg",
  },
};

import "./styles/variables.css";
import "./styles/typography.css";
import "./styles/layout.css";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
