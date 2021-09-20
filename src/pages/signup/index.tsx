import Head from "next/head";

import ZorkButton from "@components/ZorkButton";
import ZorkTextInput from "@components/ZorkTextInput";

import { AiOutlineMail } from "react-icons/ai";
import { BsLock, BsPerson } from "react-icons/bs";

import styles from "./signup.module.scss";

import { useState } from "react";
import { registerUser } from "src/Services/User/registerUser";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSingupSubmit = async (e) => {
    e.preventDefault();

    const data = await registerUser({ fullname, email, password });

    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Usuario criado!");
    }
  };

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
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
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
          <ZorkButton text="Register" isSubmit />
        </form>
      </main>

      <ToastContainer position="top-center" />
    </>
  );
};

export default Signup;
