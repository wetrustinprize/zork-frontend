import styles from "./login.module.scss";

import Head from "next/head";
import { useRouter } from "next/router";

import { AiOutlineMail } from "react-icons/ai";
import { BsLock } from "react-icons/bs";

import ZorkInput from "@components/ZorkInput";
import ZorkButton from "@components/ZorkButton";

import { loginUser } from "@services/User/loginUser";

import { useToken } from "@hooks/useToken";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "react-loader-spinner";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const access_token = useToken("/global", true);

  const [_, setCookie] = useCookies(["access_token"]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const data = await loginUser({ email, password });

    if (data.error) {
      toast.error(data.error);
    } else {
      setCookie("access_token", data.access_token, {
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
        {access_token ? (
          <Loader type="Puff" />
        ) : (
          <form className={styles.login} onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <ZorkInput
              type="text"
              placeholder="Your email"
              icon={<AiOutlineMail size="20px" />}
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <ZorkInput
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
        )}
      </main>

      <ToastContainer position="top-center" />
    </>
  );
};

export default Login;
