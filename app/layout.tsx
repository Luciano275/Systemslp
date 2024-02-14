import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Layout from "./components/Layout";

const montserrat = Montserrat({ weight: ['200', '400', '600', '800'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: "%s | System SLP",
    default: 'System SLP'
  },
  description: "System SLP te permite llevar el control de tus productos y proveedores, además, también te provee un gráfico estadístico sobre las pérdidas mensuales de los productos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <Layout content={children} font={montserrat} />
    </html>
  );
}
