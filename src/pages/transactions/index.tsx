import ZorkLayout from "@components/ZorkLayout";
import ZorkSidebar from "@components/ZorkSidebar";
import ZorkTransaction from "@components/ZorkTransaction";

import { getTransactions } from "@services/Transactions/getTransactions";
import { useUser } from "@services/User/useUser";

import { NextPageWithLayout } from "@pages/utils";

import { useState, useEffect } from "react";

import style from "./style.module.scss";

import Loader from "react-loader-spinner";

const Transactions: NextPageWithLayout = () => {
  const [transactions, setTransactions] = useState([]);

  const { access_token, user } = useUser("/login");

  useEffect(() => {
    async function getData() {
      const t = await getTransactions(access_token, { withID: "self" });
      setTransactions(t);
    }

    getData();
  }, []);

  return (
    <div className={style.container}>
      <h1>Your latest Zork transactions</h1>

      <main className={!user ? style.loading : style.transactions}>
        {!user ? (
          <Loader type="Puff" />
        ) : (
          transactions.map((t) => {
            return (
              <ZorkTransaction key={t.id} transaction={t} viewUser={user} />
            );
          })
        )}
      </main>
    </div>
  );
};

Transactions.getLayout = (page) => {
  return (
    <ZorkLayout>
      <ZorkSidebar />
      {page}
    </ZorkLayout>
  );
};

export default Transactions;
