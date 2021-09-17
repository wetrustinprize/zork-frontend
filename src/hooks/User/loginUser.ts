import { api } from "../../utils/api";

interface ILoginRequest {
  email: string;
  password: string;
}

const loginUser = async ({ email, password }: ILoginRequest) => {
  const response = api.post("/login", { email, password });

  console.log(response);
};

export { loginUser };
