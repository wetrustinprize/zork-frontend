import styles from "./login.module.scss";

import Head from "next/head";

import { AiOutlineMail } from "react-icons/ai";
import { BsLock } from "react-icons/bs";

import ZorkTextInput from "@components/ZorkTextInput";
import ZorkButton from "@components/ZorkButton";

import { useState } from "react";

import { loginUser } from "src/Services/User/loginUser";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { checkLogged } from "src/Services/User/checkLogged";
import { useRouter } from "next/dist/client/router";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cookie, setCookie] = useCookies(["user"]);

  const router = useRouter();

  checkLogged({
    accessToken: cookie.user,
    logged: () => {
      router.push("/");
    },
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const response = await loginUser({ email, password });

    if (response.error) {
      toast.error(response.error);
    } else {
      setCookie("user", response.access_token, {
        path: "/",
        sameSite: true,
        maxAge: 86400,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Zork - Login</title>
      </Head>

      <main className={styles.login_screen}>
        <form className={styles.login} onSubmit={handleLoginSubmit}>
          <h1>Login</h1>
          <ZorkTextInput
            type="text"
            placeholder="Your email"
            icon={<AiOutlineMail size="20px" />}
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <ZorkTextInput
            type="password"
            placeholder="Your password"
            icon={<BsLock size="20px" />}
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <ZorkButton text="Login" isSubmit />
        </form>
      </main>
      <ToastContainer position="top-center" />
    </>
  );
};

export default Login;
