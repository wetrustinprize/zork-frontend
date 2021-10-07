import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import Loader from "react-loader-spinner";

import style from "./style.module.scss";

const LogoutPage: React.FC = () => {
  const Router = useRouter();
  const [, , removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    removeCookie("access_token");
    Router.push("/");
  });

  return (
    <div className={style.loading}>
      <Loader type="Puff" />
    </div>
  );
};

export default LogoutPage;
