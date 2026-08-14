import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TREI 80 Trainer",
  description: "VDE-AR-N 4100 & TAB Prüfungsvorbereitung",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}