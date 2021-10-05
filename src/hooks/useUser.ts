import { useEffect } from "react";

import Router from "next/router";
import { api } from "src/utils/api";

import type { User } from "../services/User/utils";

import { getRequests } from "@services/Requests/getRequests";
import { Request } from "@services/Requests/utils";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { setUser } from "src/features/user/userSlice";
import { useToken } from "./useToken";

/**
 * React hook that give information about the authenticated user.
 * @param redirectTo The url to redirect if use is not authenticated, if set to undefined, it doesn't redirect to any page. Default: undefined.
 * @param redirectIfFound Should redirect if found user instead of if not found? Default: false.
 * @returns The User object
 */
const useUser = (
  redirectTo: string = "/login",
  redirectIfFound: boolean = false
): { access_token: string; user: User; refreshUser: () => void } => {
  const access_token = useToken(undefined);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const refreshUser = () => {
    dispatch(setUser(undefined));
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        // Try to fetch User information
        const response = await api.get("/user", {
          headers: {
            authorization: "Bearer " + access_token,
          },
        });

        const requests = await getRequests(access_token);
        const newUser = {
          ...response.data,
          total_requests: requests.filter(
            (req: Request) => !req.request_canceled && !req.request_result
          ).length,
        } as User;

        // Sets the new User information
        dispatch(setUser(newUser));

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
            dispatch(setUser({} as User));
          }
        } else {
          throw err;
        }
      }
    };

    // check if has access_token cookie
    if (!access_token && !redirectIfFound && redirectTo) {
      Router.push(redirectTo);
      return;
    }

    // check if has User in store
    if (!user || user == ({} as User)) {
      console.log("no user");
      getUser();
    }
  });

  return { access_token, user, refreshUser };
};

export { useUser };
