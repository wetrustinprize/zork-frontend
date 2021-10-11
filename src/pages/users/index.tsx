import { NextPageWithLayout } from "src/libs/utils";

import ZorkLayout from "@components/ZorkLayout";
import ZorkSidebar from "@components/ZorkSidebar";
import ZorkUserCard from "@components/ZorkUserCard";
import ZorkButton from "@components/ZorkButton";

import { useToken } from "@hooks/useToken";

import { User } from "@services/User/utils";
import getUserInfo from "@services/User/getUserInfo";

import style from "./style.module.scss";

import Loader from "react-loader-spinner";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { IoMdSearch } from "react-icons/io";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "@components/UserProvider";
import Head from "next/head";

const Users: NextPageWithLayout = () => {
  const router = useRouter();

  const access_token = useToken();

  const [cookies, setCookies] = useCookies(["last_seen_user"]);

  const [viewUser, setViewUser] = useState(undefined as User);
  const [viewEmail, setViewEmail] = useState("");

  const handleFind = async (e) => {
    e.preventDefault();

    if (!viewEmail) {
      toast.error("Please enter a email");
      return;
    }

    await showUser({ email: viewEmail });
  };

  const showUser = async (
    { id, email }: { id?: string; email?: string } = {
      id: undefined,
      email: undefined,
    }
  ) => {
    const response = await getUserInfo(access_token, {
      id,
      email,
    });
    console.log(response);
    if (!response.error) {
      setCookies("last_seen_user", response.id);

      setViewUser(response as User);
    } else {
      toast.error(response.error);
    }
  };

  useEffect(() => {
    async function getData() {
      const id = router.query.id || cookies.last_seen_user || undefined;

      if (!id && !viewUser) {
        setViewUser(undefined);
        return;
      } else {
        await showUser({ id });
      }
    }

    getData();
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Zork - Users</title>
      </Head>
      <main className={style.usersMain}>
        <header>
          <h1>Users</h1>

          <form className={style.searchBar} onSubmit={handleFind}>
            <IoMdSearch size={"40px"} />
            <input
              type="text"
              placeholder="User email..."
              onChange={(e) => {
                setViewEmail(e.target.value);
              }}
            />
            <ZorkButton text="Search" isSubmit />
          </form>
        </header>
        {!access_token ? (
          <div className={style.loading}>
            <Loader type="Puff" />
          </div>
        ) : (
          <>
            <ZorkUserCard viewUser={viewUser} />
          </>
        )}
      </main>
      <ToastContainer position="top-center" />
    </>
  );
};

Users.getLayout = (page) => {
  return (
    <UserProvider>
      <ZorkLayout>
        <ZorkSidebar />
        {page}
      </ZorkLayout>
    </UserProvider>
  );
};

export default Users;
