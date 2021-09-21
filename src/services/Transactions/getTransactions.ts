import { api } from "src/utils/api";

interface IGetTransactions {
  access_token: string;
}

const getTransactions = async ({ access_token }: IGetTransactions) => {
  try {
    const response = await api.get("/transaction", {
      headers: { Authorization: "Bearer " + access_token },
    });

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

export { getTransactions };
