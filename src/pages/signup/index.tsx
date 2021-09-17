import Head from "next/head";

import ZorkButton from "@components/ZorkButton";
import ZorkTextInput from "@components/ZorkTextInput";

import { AiOutlineMail } from "react-icons/ai";
import { BsLock, BsPerson } from "react-icons/bs";

import styles from "./signup.module.scss";

const Signup: React.FC = () => {
  const handleSingupSubmit = async () => {};

  return (
    <>
      <Head>
        <title>Zork - Sign Up</title>
      </Head>

      <main className={styles.signup_screen}>
        <form className={styles.signup} onSubmit={handleSingupSubmit}>
          <h1>Sign Up</h1>
          <ZorkTextInput
            type="text"
            placeholder="Your full name"
            icon={<BsPerson size="20px" />}
            name="fullName"
          />
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
          <ZorkButton text="Register" isSubmit />
        </form>
      </main>
    </>
  );
};

export default Signup;
