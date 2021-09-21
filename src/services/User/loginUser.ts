import { api } from "../../utils/api";

interface ILoginRequest {
  email: string;
  password: string;
}

const loginUser = async ({ email, password }: ILoginRequest) => {
  try {
    const response = await api.post("/login", { email, password });

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

export { loginUser };
