import styles from "./login.module.scss";

import Head from "next/head";

import { AiOutlineMail } from "react-icons/ai";
import { BsLock } from "react-icons/bs";

import ZorkTextInput from "@components/ZorkTextInput";
import ZorkButton from "@components/ZorkButton";

const Login: React.FC = () => {
  const handleLoginSubmit = async () => {};

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
          />
          <ZorkTextInput
            type="password"
            placeholder="Your password"
            icon={<BsLock size="20px" />}
            name="password"
          />
          <ZorkButton text="Login" isSubmit />
        </form>
      </main>
    </>
  );
};

export default Login;
