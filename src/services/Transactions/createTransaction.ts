import { api } from "src/utils/api";

interface ICreateTransaction {
  id: string;
  value: number;
  description: string;
}

const createTransaction = async (
  access_token: string,
  { description, id, value }: ICreateTransaction
) => {
  try {
    const response = await api.post(
      "/transaction",
      { description, id, value },
      { headers: { Authorization: "Bearer " + access_token } }
    );

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

export { createTransaction };
