import { api } from "src/utils/api";

interface ICheckLogin {
  accessToken: string;
  notLogged?: () => void;
  logged?: () => void;
}

const checkLogged = async ({
  accessToken,
  notLogged = () => {
    return false;
  },
  logged = () => {
    return true;
  },
}: ICheckLogin) => {
  // Check if is undefined
  if (!accessToken) {
    return notLogged();
  }

  // Check valid token
  try {
    await api.get("/user", {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    });

    return logged();
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    if (err.response == 403) {
      return notLogged();
    } else {
      throw err;
    }
  }
};

export { checkLogged };
