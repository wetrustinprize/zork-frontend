import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

/**
 * React hook that gets the access_token from the cookie jar
 * @param redirectTo The url to redirect if use is not authenticated, if set to undefined, it doesn't redirect to any page. Default: undefined.
 * @param redirectIfFound Should redirect if found user instead of if not found? Default: false.
 * @returns The access token
 */
const useToken = (
  redirectTo: string = "/login",
  redirectIfFound: boolean = false
): string => {
  const [cookies] = useCookies(["access_token"]);
  const router = useRouter();

  useEffect(() => {
    if (
      redirectTo &&
      ((cookies.access_token && redirectIfFound) ||
        (!cookies.access_token && !redirectIfFound))
    ) {
      router.push(redirectTo);
    }
  });

  return cookies.access_token;
};

export { useToken };
