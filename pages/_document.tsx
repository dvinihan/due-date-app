import { bodyMarginHeight } from "@/constants";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{ margin: bodyMarginHeight }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
