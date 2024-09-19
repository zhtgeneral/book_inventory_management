import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Book inventory App",
  description: "For Second round application to Second Bind",
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
        <Toaster />
      </body>
    </html>
  );
}
