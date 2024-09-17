import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LayoutComponent from "./../components/layout/layoutComponent";
import { Suspense } from "react";

const popins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sitapem",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${popins.className}`}>
        <Suspense>
          <LayoutComponent>{children}</LayoutComponent>
        </Suspense>
      </body>
    </html>
  );
}
