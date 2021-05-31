import "styles/global.css";
import "styles/core.css";

import { AppProps } from "next/app";
import React from "react";
import { CookiesProvider } from "react-cookie";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </>
  );
};

export default App;
