import { getRequests } from "@services/Requests/getRequests";
import { Request } from "@services/Requests/utils";
import getUserInfo from "./getUserInfo";
import { User } from "./utils";

const getAuthUser = async (access_token: string) => {
  // Try to fetch User information
  const user = await getUserInfo(access_token);
  const requests = await getRequests(access_token);

  // Check if has returned a error
  if (user.error) {
    return user;
  }

  const newUser = {
    ...user,
    total_requests: requests.filter(
      (req: Request) => !req.request_canceled && !req.request_result
    ).length,
  } as User;

  return newUser;
};

export { getAuthUser };
