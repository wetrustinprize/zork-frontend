import Head from "next/head";
import ZorkButton from "../components/ZorkButton";
import ZorkTextInput from "../components/ZorkTextInput";

import styles from "./home.module.scss";

import { FaBeer } from "react-icons/fa";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>NextJS template</title>
      </Head>

      <main className={styles.login}>
        <ZorkButton text="Teste" />
        <ZorkTextInput icon={<FaBeer size="20px" />} />
      </main>
    </>
  );
};

export default Home;
