import { WEB_SOCKET_URL } from "@/constants";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import localFont from "next/font/local";

export const poohFont = localFont({ src: "./pooh.ttf" });

type AppContextType = {
  socket: WebSocket | undefined;
};
export const AppContext = createContext<AppContextType>({ socket: undefined });

export default function App({ Component, pageProps }: AppProps) {
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const webSocket = new WebSocket(WEB_SOCKET_URL);
    setSocket(webSocket);
    return () => {
      webSocket?.close();
    };
  }, []);

  return (
    <AppContext.Provider value={{ socket }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
