import type { Metadata } from "next";
import Script from "next/script"; // এটি ইম্পোর্ট করুন
import "./globals.css";

export const metadata: Metadata = {
  title: "Lakhpoti App",
  description: "Earn rewards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* এই স্ক্রিপ্টটি অবশ্যই থাকতে হবে */}
        <Script 
          src="https://telegram.org/js/telegram-web-app.js" 
          strategy="beforeInteractive" 
        />
      </head>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
