import ZorkLayout from "@components/ZorkLayout";
import ZorkSidebar from "@components/ZorkSidebar";
import ZorkTransaction from "@components/ZorkTransaction";
import { ZorkToggle } from "@components/ZorkToggle";

import { getTransactions } from "@services/Transactions/getTransactions";
import { Transaction } from "@services/Transactions/utils";
import { useUser } from "@hooks/useUser";

import { NextPageWithLayout } from "@pages/utils";

import { useState, useEffect } from "react";

import style from "./style.module.scss";

import Loader from "react-loader-spinner";

const Transactions: NextPageWithLayout = () => {
  const [transactions, setTransactions] = useState([] as Transaction[]);
  const [filteredTransactions, setFilteredTransactions] = useState(
    [] as Transaction[]
  );

  const [youFilter, setYouFilter] = useState(true);
  const [otherFilter, setOtherFilter] = useState(true);

  const { access_token, user } = useUser("/login");

  useEffect(() => {
    async function getData() {
      const t = await getTransactions(access_token, { withID: "self" });
      setTransactions(t);
    }

    getData();
  }, [access_token, user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const filtered = transactions.filter(
      (transaction) =>
        ((transaction.from_id == user.id || transaction.to_id == user.id) &&
          youFilter) ||
        (transaction.from_id != user.id &&
          transaction.to_id != user.id &&
          otherFilter)
    );

    setFilteredTransactions(filtered);
  }, [transactions, youFilter, otherFilter]);

  return (
    <div className={style.container}>
      <header>
        <h1>Latest Zork transactions</h1>

        <div>
          <ZorkToggle
            text="You"
            unchecked={!youFilter}
            onToggle={(v) => {
              setYouFilter(v);
            }}
          />
          <ZorkToggle
            text="Others"
            unchecked={!otherFilter}
            onToggle={(v) => {
              setOtherFilter(v);
            }}
          />
        </div>
      </header>

      <main className={!user ? style.loading : style.transactions}>
        {!user ? (
          <Loader type="Puff" />
        ) : filteredTransactions.length > 0 ? (
          filteredTransactions.map((t) => {
            return (
              <ZorkTransaction key={t.id} transaction={t} viewUser={user} />
            );
          })
        ) : (
          <div className={style.empty}>Nothing here :(</div>
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
