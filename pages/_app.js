import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import { I18nProvider } from "context/i18n";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <I18nProvider>
        <Component {...pageProps} />
      </I18nProvider>
    </NextUIProvider>
  );
}

export default MyApp;
