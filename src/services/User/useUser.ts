import { useEffect } from "react";
import { useState } from "react";

import { useCookies } from "react-cookie";
import Router from "next/router";
import { api } from "src/utils/api";

import type { User } from "./utils";

/**
 *
 * @param redirectTo The url to redirect if use is not authenticated, if set to undefined, it doesn't redirect to any page. Default: undefined.
 * @param redirectIfFound Should redirect if found user instead of if not found? Default: false.
 * @returns The access token and the User object
 */
const useUser = (
  redirectTo: string = undefined,
  redirectIfFound: boolean = false
): { access_token: string; user: User } => {
  const [cookie] = useCookies(["access_token"]);
  const [user, setUser] = useState(undefined as User);

  useEffect(() => {
    // Needed a async function to execute axios
    async function checkValidToken() {
      try {
        // Try to fetch User information
        const response = await api.get("/user", {
          headers: {
            authorization: "Bearer " + cookie.access_token,
          },
        });

        // Sets the new User information
        setUser(response.data);

        // Check if should redirect if found User
        if (redirectIfFound && redirectTo) {
          Router.push(redirectTo);
        }
      } catch (err) {
        // Check if is a axios http error
        if (!err.response) {
          throw err;
        }

        // Check if is code 403
        if (err.response.status == 403) {
          // Check if should redirect if not found
          if (!redirectIfFound && redirectTo) {
            Router.push(redirectTo);
          } else {
            setUser({} as User);
          }
        } else {
          throw err;
        }
      }
    }

    // check if has access_token cookie
    if (!cookie.access_token && !redirectIfFound && redirectTo) {
      Router.push(redirectTo);
      return;
    }

    // check if is a valid token
    checkValidToken();
  }, [cookie.access_token]);

  return { access_token: cookie.access_token, user };
};

export { useUser };
