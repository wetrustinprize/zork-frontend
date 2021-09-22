import { useEffect } from "react";
import { useState } from "react";

import { useCookies } from "react-cookie";
import Router from "next/router";
import { api } from "src/utils/api";

import type { User } from "./utils";

const getAuthenticated = (
  ignoreRedirect: boolean = false
): { access_token: string; user: User } => {
  const [cookie] = useCookies(["access_token"]);
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    async function checkValidToken() {
      try {
        const response = await api.get("/user", {
          headers: {
            authorization: "Bearer " + cookie.access_token,
          },
        });

        setUser(response.data);
      } catch (err) {
        if (!err.response) {
          throw err;
        }

        if (err.response == 403) {
          Router.push("/login");
          return;
        } else {
          throw err;
        }
      }
    }

    // check if has access_token cookie
    if (!cookie.access_token && !ignoreRedirect) {
      Router.push("/login");
      return;
    }

    // check if is a valid token
    checkValidToken();
  }, [cookie.access_token]);

  return { access_token: cookie.access_token, user };
};

export { getAuthenticated };
