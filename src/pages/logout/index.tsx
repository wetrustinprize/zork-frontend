import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const LogoutPage: React.FC = () => {
  const Router = useRouter();
  const [, , removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    removeCookie("access_token");
    Router.push("/");
  });

  return <></>;
};

export default LogoutPage;
