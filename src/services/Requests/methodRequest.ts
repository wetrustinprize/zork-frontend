import { api } from "src/utils/api";

interface IMethodRequest {
  id: string;
  method: "accept" | "refuse";
}

const methodRequest = async (
  access_token: string,
  { id, method }: IMethodRequest
): Promise<any> => {
  try {
    let response = await api.post(
      "/request/" + id,
      { method },
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

export { methodRequest };
