import FormsProviders from "@/contexts/formsContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../components/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DRH Restauration",
  description: "Restauration des paysages forestiers en RDC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <FormsProviders>
            {children}
          </FormsProviders>
        </main>
      </body>
    </html>
  );
}