import Head from "next/head";

import ZorkButton from "@components/ZorkButton";
import ZorkInput from "@components/ZorkInput";

import { AiOutlineMail } from "react-icons/ai";
import { BsLock, BsPerson } from "react-icons/bs";

import styles from "./signup.module.scss";

import { useState, useEffect } from "react";
import { registerUser } from "src/services/User/registerUser";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useToken } from "@hooks/useToken";
import Loader from "react-loader-spinner";

//TODO: Register AND login the user, there's no logic in just registering and not logging the user in
const Signup: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const access_token = useToken("/global", true);

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
        {access_token ? (
          <Loader type="Puff" />
        ) : (
          <form className={styles.signup} onSubmit={handleSingupSubmit}>
            <h1>Sign Up</h1>
            <ZorkInput
              type="text"
              placeholder="Your full name"
              icon={<BsPerson size="20px" />}
              name="fullName"
              onChange={(e) => {
                setFullname(e.target.value);
              }}
            />
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
            <ZorkButton text="Register" isSubmit />
          </form>
        )}
      </main>

      <ToastContainer position="top-center" />
    </>
  );
};

export default Signup;
