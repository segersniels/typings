import "styles/global.css";
import "styles/core.css";

import { CalculationContextProvider } from "context/CalculationContext";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { CookiesProvider } from "react-cookie";

const title = "typings.space 🚀";
const description =
  "Want to test out that new keyboard you just built? typings.space is a simplistic interpretation of a pleasing typing speed test 👋";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta key="og:title" property="og:title" content={title} />
        <meta
          key="og:description"
          property="og:description"
          content={description}
        />

        <meta key="twitter:title" property="twitter:title" content={title} />
        <meta
          key="twitter:description"
          property="twitter:description"
          content={description}
        />
      </Head>

      <CookiesProvider>
        <CalculationContextProvider>
          <Component {...pageProps} />
        </CalculationContextProvider>
      </CookiesProvider>
    </>
  );
};

export default App;
