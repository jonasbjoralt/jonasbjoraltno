import "../styles/globals.css";
import React from "react";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, react/prop-types
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
