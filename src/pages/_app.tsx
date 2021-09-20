import { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import "../styles/Global.scss";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </>
  );
};

export default MyApp;
