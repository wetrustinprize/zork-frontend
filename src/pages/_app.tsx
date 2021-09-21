import { CookiesProvider } from "react-cookie";
import "../styles/Global.scss";

import { AppPropsWithLayout } from "@pages/utils";

const MyApp: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
};

export default MyApp;
