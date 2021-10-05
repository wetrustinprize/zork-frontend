import { CookiesProvider } from "react-cookie";
import "../styles/Global.scss";

import { AppPropsWithLayout } from "@pages/utils";
import { Provider } from "react-redux";
import store from "src/store";

const MyApp: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      {getLayout(
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      )}
    </Provider>
  );
};

export default MyApp;
