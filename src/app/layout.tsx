import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Margarita Ivy: THE FOAL",
  description: "Margarita Ivy's Concept: THE FOAL. A glitch in reality.",
};

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
