import ZorkLayout from "@components/ZorkLayout";
import ZorkSidebar from "@components/ZorkSidebar";
import ZorkTransaction from "@components/ZorkTransaction";
import ZorkContainer from "@components/ZorkContainer";

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
      const transactions = await getTransactions({ access_token });
      setTransactions(transactions);
    }

    getData();
  }, []);

  return (
    <ZorkContainer className={style.container}>
      <h1>Latest Zork transactions</h1>

      <main className={!user ? style.loading : style.transactions}>
        {!user ? (
          <Loader type="Puff" />
        ) : (
          transactions.map((t) => {
            return <ZorkTransaction key={t.id} transaction={t} />;
          })
        )}
      </main>
    </ZorkContainer>
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
