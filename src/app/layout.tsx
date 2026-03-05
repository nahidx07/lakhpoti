import TelegramProvider from "@/components/TelegramProvider";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black antialiased">
        <TelegramProvider>{children}</TelegramProvider>
      </body>
    </html>
  );
}

