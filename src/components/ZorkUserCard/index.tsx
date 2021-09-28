import ZorkButton from "@components/ZorkButton";
import ZorkInput from "@components/ZorkInput";
import { ZorkToggle } from "@components/ZorkToggle";
import ZorkTransaction from "@components/ZorkTransaction";

import { getTransactions } from "@services/Transactions/getTransactions";
import { Transaction } from "@services/Transactions/utils";

import { useUser } from "@services/User/useUser";
import { User } from "@services/User/utils";

import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";

import style from "./style.module.scss";

interface IZorkUserCard {
  viewUser: User;
}

const ZorkUserCard: React.FC<IZorkUserCard> = ({ viewUser }: IZorkUserCard) => {
  const { access_token, user } = useUser();

  const [transactions, setTransactions] = useState([] as Transaction[]);
  const [filteredTransactions, setFilteredTransactions] = useState(
    [] as Transaction[]
  );

  const [sentFilter, setSentFilter] = useState(false);
  const [receivedFilter, setReceivedFilter] = useState(false);

  useEffect(() => {
    const filtered = transactions.filter(
      (transaction) =>
        (transaction.from_id == user.id && !sentFilter) ||
        (transaction.to_id == user.id && !receivedFilter)
    );

    setFilteredTransactions(filtered);
  }, [sentFilter, receivedFilter, transactions]);

  useEffect(() => {
    async function getData() {
      const t = await getTransactions(access_token, { withID: viewUser.id });

      if (!t.error) {
        setTransactions(t);
      }
    }

    getData();
  }, [viewUser]);

  return (
    <div className={style.zorkUserCard}>
      {!user ? (
        <div className={style.loading}>
          <Loader type="Puff" />
        </div>
      ) : (
        <>
          <div className={style.userInfo}>
            <h1>{viewUser.fullname}</h1>
          </div>

          <div className={style.userActions}>
            <ZorkInput
              type="number"
              min={1}
              icon={<>Z</>}
              placeholder="Total Zorks"
            />
            <ZorkInput type="text" icon={<>M</>} placeholder="Message" />

            <ZorkButton text="Send" />
            <ZorkButton text="Request" />
          </div>

          <div className={style.divider} />

          <div className={style.transactionHeader}>
            <h1>
              {user.id == viewUser.id ? (
                <>Your transactions</>
              ) : (
                <>
                  Your transactions with <strong>{viewUser.first_name}</strong>
                </>
              )}
            </h1>

            <div className={style.transactionFilter}>
              <ZorkToggle
                text="Sent"
                onToggle={(v) => {
                  setSentFilter(v);
                }}
              />
              <ZorkToggle
                text="Received"
                onToggle={(v) => {
                  setReceivedFilter(v);
                }}
              />
            </div>
          </div>

          <div className={style.transactions}>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => {
                return <ZorkTransaction key={t.id} transaction={t} />;
              })
            ) : (
              <div className={style.empty}>Nothing here :(</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ZorkUserCard;
