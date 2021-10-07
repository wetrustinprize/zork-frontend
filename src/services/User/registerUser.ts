import { api } from "src/utils/api";

interface IRegisterUser {
  fullname: string;
  email: string;
  password: string;
}

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
