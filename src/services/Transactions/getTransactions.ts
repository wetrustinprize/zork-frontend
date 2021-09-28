import { api } from "src/utils/api";
import { Transaction } from "./utils";

interface IGetTransactionsConf {
  withID?: string;
}

const getTransactions = async (
  access_token: string,
  conf: IGetTransactionsConf = {}
): Promise<any> => {
  const { withID } = conf;

  try {
    let response = undefined;

    if (withID) {
      response = await api.get("/transaction/with/" + withID, {
        headers: { Authorization: "Bearer " + access_token },
      });
    } else {
      response = await api.get("/transaction", {
        headers: { Authorization: "Bearer " + access_token },
      });
    }

    return response.data as Transaction[];
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
