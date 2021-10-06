import { useEffect } from "react";

import Router from "next/router";
import { api } from "src/utils/api";

import type { User } from "../services/User/utils";

import { getRequests } from "@services/Requests/getRequests";
import { Request } from "@services/Requests/utils";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setUser } from "src/features/user/userSlice";
import { useToken } from "./useToken";
import { getAuthUser } from "@services/User/getAuthuser";

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
  const access_token = useToken(redirectTo, redirectIfFound);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const refreshUser = async () => {
    try {
      const newUser = await getAuthUser(access_token);

      dispatch(setUser(newUser));
    } catch (err) {
      // Check if is a axios http error
      if (!err.response) {
        throw err;
      }

      // Check if is code 403
      if (err.response.status == 403) {
        Router.push(redirectTo);
      } else {
        throw err;
      }
    }
  };

  return { access_token, user, refreshUser };
};

export { useUser };
