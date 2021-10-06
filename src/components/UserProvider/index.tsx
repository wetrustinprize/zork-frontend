import { useAppDispatch } from "@hooks/redux";
import { useToken } from "@hooks/useToken";
import { getAuthUser } from "@services/User/getAuthuser";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { setUser } from "src/features/user/userSlice";

const UserProvider: React.FC = ({ children }) => {
  const access_token = useToken();
  const dispatch = useAppDispatch();
  const Router = useRouter();

  useEffect(() => {
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
    };

    getData();
  });

  return <>{children}</>;
};

export default UserProvider;
