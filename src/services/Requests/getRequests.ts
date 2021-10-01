import { api } from "src/utils/api";

const getRequests = async (access_token: string): Promise<any> => {
  try {
    const response = await api.get("/requests", {
      headers: { Authorization: "Bearer " + access_token },
    });

    return response.data as Request[];
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    const { status } = err.response;
    const { error } = err.response.data;

    return { status, error };
  }
};

export { getRequests };
