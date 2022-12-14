import "../styles/globals.css";
import type { AppProps } from "next/app";
import ApplicationLayout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApplicationLayout>
      <Component {...pageProps} />
    </ApplicationLayout>
  );
}

export default MyApp;
