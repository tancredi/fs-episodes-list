import type { NextComponentType } from "next";
import type { AppContext, AppInitialProps, AppProps } from "next/app";

import "src/styles/main.css";

type AppT = NextComponentType<AppContext, AppInitialProps, AppProps>;

const App: AppT = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
