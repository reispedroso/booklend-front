import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Booklend",
  description: "Discover the world best books near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-booklend-gray text-black w-full h-screen flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
