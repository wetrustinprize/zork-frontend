import ZorkLayout from "@components/ZorkLayout";
import ZorkSidebar from "@components/ZorkSidebar";
import ZorkTransaction from "@components/ZorkTransaction";

import { NextPageWithLayout } from "@pages/utils";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import type { ReactElement } from "react";

import style from "./style.module.scss";
import { getTransactions } from "@services/Transactions/getTransactions";

const Transactions: NextPageWithLayout = () => {
  const [transactions, setTransactions] = useState([]);
  const [cookie, setCookie] = useCookies(["user"]);

  useEffect(() => {
    async function getData() {
      const transactions = await getTransactions({ access_token: cookie.user });
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
