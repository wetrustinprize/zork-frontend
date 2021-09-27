import { api } from "src/utils/api";
import { User } from "./utils";

interface IGetUserInfo {
  email?: string;
  id?: string;
}

const getUserInfo = async (
  access_token: string,
  { email, id }: IGetUserInfo
): Promise<any> => {
  try {
    let response = undefined;

    if (email) {
      response = await api.get("/user/by-email/" + email, {
        headers: { Authorization: "Bearer " + access_token },
      });
    } else if (id) {
      response = await api.get("/user/" + id, {
        headers: { Authorization: "Bearer " + access_token },
      });
    } else {
      throw new Error("Must have either ID or Email");
    }

    return response.data as User;
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    const { status } = err.response;
    const { error } = err.response.data;

    return { status, error };
  }
};

export default getUserInfo;
