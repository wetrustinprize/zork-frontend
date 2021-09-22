import ZorkLayout from "@components/ZorkLayout";
import ZorkSidebar from "@components/ZorkSidebar";
import ZorkTransaction from "@components/ZorkTransaction";

import { getTransactions } from "@services/Transactions/getTransactions";
import { useUser } from "@services/User/useUser";

import { NextPageWithLayout } from "@pages/utils";

import type { ReactElement } from "react";
import { useState, useEffect } from "react";

import style from "./style.module.scss";

const Transactions: NextPageWithLayout = () => {
  const [transactions, setTransactions] = useState([]);

  const { access_token, user } = useUser("/login");

  useEffect(() => {
    async function getData() {
      const transactions = await getTransactions({ access_token });
      setTransactions(transactions);
    }

    getData();
  }, []);

  if (!access_token || !transactions) {
    return <>Loading</>;
  }

  return (
    <div className={style.container}>
      <h1>Latest Zork transactions</h1>

      <main>
        {!access_token ? (
          <p>Loading, please wait!</p>
        ) : (
          transactions.map((t) => {
            return <ZorkTransaction key={t.id} transaction={t} />;
          })
        )}
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
