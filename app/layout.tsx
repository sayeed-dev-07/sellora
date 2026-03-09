import type { Metadata } from "next";
import {  Noto_Sans_JP, Outfit,  } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const notoSans = Noto_Sans_JP({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sellora",
  description: "Sellora is a cutting-edge e-commerce platform that empowers businesses to create stunning online stores with ease. With its user-friendly interface and powerful features, Sellora enables entrepreneurs to showcase their products, manage inventory, and provide seamless shopping experiences for customers. Whether you're a small boutique or a large enterprise, Sellora offers the tools you need to succeed in the competitive world of online retail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${outfit.variable} antialiased`}
      >
        <div className="sticky top-0 left-0 z-999 bg-[#ffffff75]">
          <Navbar/>
        </div>
        <div className="">
          {children}
        </div>
      </body>
    </html>
  );
}
