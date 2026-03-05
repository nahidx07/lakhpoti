"use client";
import Script from "next/script";
import { createContext, useContext, useEffect, useState } from "react";

export const TgContext = createContext<any>(null);

export default function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if ((window as any).Telegram?.WebApp) {
      const tg = (window as any).Telegram.WebApp;
      tg.ready();
      tg.expand();
      setUser(tg.initDataUnsafe?.user || null);
    }
  }, []);

  return (
    <TgContext.Provider value={user}>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      {children}
    </TgContext.Provider>
  );
}

