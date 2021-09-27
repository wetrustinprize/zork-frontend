import { api } from "src/utils/api";
import { User } from "./utils";

interface IGetUserConf {
  email?: string;
  id?: string;
}

/**
 *
 * @param access_token Access token for communicating with the server.
 * @param conf Information on how to get the user data
 * @returns
 */
const getUserInfo = async (
  access_token: string,
  conf: IGetUserConf
): Promise<any> => {
  const { email, id } = conf;

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
