import { NextPageWithLayout } from "@pages/utils";

import ZorkLayout from "@components/ZorkLayout";
import ZorkSidebar from "@components/ZorkSidebar";
import ZorkUserCard from "@components/ZorkUserCard";
import ZorkButton from "@components/ZorkButton";

import { useUser } from "@services/User/useUser";
import { User } from "@services/User/utils";
import getUserInfo from "@services/User/getUserInfo";

import { IoMdSearch } from "react-icons/io";

import style from "./style.module.scss";

import Loader from "react-loader-spinner";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users: NextPageWithLayout = () => {
  const router = useRouter();

  const { user, access_token } = useUser("/login");

  const [cookies, setCookies] = useCookies(["last_seen_user"]);

  const [viewUser, setViewUser] = useState({} as User);
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

      if (!id) {
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
      <main className={style.usersMain}>
        {!user ? (
          <div className={style.loading}>
            <Loader type="Puff" />
          </div>
        ) : (
          <>
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

            <ZorkUserCard viewUser={viewUser ? viewUser : user} />
          </>
        )}
      </main>
      <ToastContainer position="top-center" />
    </>
  );
};

Users.getLayout = (page) => {
  return (
    <ZorkLayout>
      <ZorkSidebar />
      {page}
    </ZorkLayout>
  );
};

export default Users;
