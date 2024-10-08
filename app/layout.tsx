import type { Metadata } from "next";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-black to-blue-950">
        {children}
      </body>
    </html>
  );
}
