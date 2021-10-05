import { api } from "src/utils/api";

interface IRegisterUser {
  fullname: string;
  email: string;
  password: string;
}

// TODO: Make return only the User data instead of all the response data
const registerUser = async ({ fullname, email, password }: IRegisterUser) => {
  try {
    const response = await api.post("/user", { fullname, email, password });

    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    const { status } = err.response;
    const { error } = err.response.data;

    return { status, error };
  }
};

export { registerUser };
