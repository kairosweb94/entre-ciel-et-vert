import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Entre Ciel et Vert | Architecte Paysagiste – Alexandre Phelip",
  description: "Conception et réalisation de jardins sur mesure, terrasses et espaces verts haut de gamme. Alexandre Phelip, architecte paysagiste.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
