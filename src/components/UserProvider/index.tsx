import { useAppDispatch } from "@hooks/redux";
import { useToken } from "@hooks/useToken";

import { getAuthUser } from "@services/User/getAuthuser";

import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import { setUser } from "src/features/user/userSlice";
import Loader from "react-loader-spinner";

import style from "./style.module.scss";

const UserProvider: React.FC = ({ children }) => {
  const access_token = useToken();
  const dispatch = useAppDispatch();
  const Router = useRouter();
  const [foundUser, setFoundUser] = useState(false);

  useEffect(() => {
    if (!access_token) {
      Router.push("/login");
      return;
    }

    const getData = async () => {
      const newUser = await getAuthUser(access_token);

      if (newUser.error) {
        if (newUser.status == 403) {
          Router.push("/login");
        } else {
          throw newUser;
        }
      }

      dispatch(setUser(newUser));
      setFoundUser(true);
    };

    getData();
  });

  return (
    <>
      {foundUser ? (
        children
      ) : (
        <div className={style.loading}>
          <Loader type="Puff" />
        </div>
      )}
    </>
  );
};

export default UserProvider;
