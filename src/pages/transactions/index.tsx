import ZorkLayout from "@components/ZorkLayout";
import ZorkSidebar from "@components/ZorkSidebar";
import ZorkTransaction from "@components/ZorkTransaction";

import { getTransactions } from "@services/Transactions/getTransactions";
import { getAuthenticated } from "@services/User/getAuthenticated";

import { NextPageWithLayout } from "@pages/utils";
import { useState, useEffect } from "react";

import type { ReactElement } from "react";

import style from "./style.module.scss";

const Transactions: NextPageWithLayout = () => {
  const [transactions, setTransactions] = useState([]);

  const { access_token, user } = getAuthenticated();

  if (!access_token) {
    return <>Loading</>;
  }

  useEffect(() => {
    async function getData() {
      const transactions = await getTransactions({ access_token });
      setTransactions(transactions);
    }

    getData();
  }, []);

  return (
    <div className={style.container}>
      <h1>Latest Zork transactions</h1>

      <main>
        {transactions.map((t) => {
          return <ZorkTransaction transaction={t} />;
        })}
      </main>
    </div>
  );
};

Transactions.getLayout = (page: ReactElement) => {
  return (
    <ZorkLayout>
      <ZorkSidebar />
      {page}
    </ZorkLayout>
  );
};

export default Transactions;
