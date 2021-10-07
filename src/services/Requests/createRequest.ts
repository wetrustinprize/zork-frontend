import { api } from "src/utils/api";

interface ICreateRequest {
  email: string;
  value: number;
  description?: string;
}

const createRequest = async (
  access_token: string,
  { email, value, description = "" }: ICreateRequest
): Promise<any> => {
  try {
    let response = await api.post(
      "/request",
      { email, value, description },
      { headers: { Authorization: "Bearer " + access_token } }
    );

    return response.data as Request;
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    const { status } = err.response;
    const { error } = err.response.data;

    return { status, error };
  }
};

export { createRequest };
