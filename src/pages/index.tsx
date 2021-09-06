import Head from "next/head";
import ZorkButton from "../components/ZorkButton";
import ZorkTextInput from "../components/ZorkTextInput";

import styles from "./home.module.scss";

import { AiOutlineMail } from "react-icons/ai";
import { BsLock, BsPerson } from "react-icons/bs";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>NextJS template</title>
      </Head>

      <main className={styles.login_screen}>
        <div className={styles.login}>
          <h1>Login</h1>
          <ZorkTextInput type="text" icon={<AiOutlineMail size="20px" />} />
          <ZorkTextInput type="password" icon={<BsLock size="20px" />} />
          <ZorkButton text="Login" />
        </div>

        <div className={styles.register}>
          <h1>Register</h1>
          <ZorkTextInput type="text" icon={<BsPerson size="20px" />} />
          <ZorkTextInput type="text" icon={<AiOutlineMail size="20px" />} />
          <ZorkTextInput type="password" icon={<BsLock size="20px" />} />
          <ZorkButton text="Register" />
        </div>
      </main>
    </>
  );
};

export default Home;
