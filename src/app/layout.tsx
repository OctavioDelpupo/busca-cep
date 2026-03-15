import type { Metadata } from "next";
import { Roboto, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});


// Configurando a fonte Roboto
const roboto = Roboto({
  variable: "--font-roboto", // você pode usar qualquer nome de variável CSS
  subsets: ["latin"],
  weight: ["400", "700"], // opcional: defina os pesos que deseja usar
});

export const metadata: Metadata = {
  title: "Buscar CEP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
