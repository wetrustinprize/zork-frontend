import { api } from "src/utils/api";

interface ICreateRequest {
  to_id: string;
  value: number;
  description?: string;
}

const createRequest = async (
  access_token: string,
  { to_id, value, description = "" }: ICreateRequest
): Promise<any> => {
  try {
    let response = await api.post(
      "/request",
      { to_id, value, description },
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
