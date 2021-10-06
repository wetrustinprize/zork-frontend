import ZorkButton from "@components/ZorkButton";
import ZorkInput from "@components/ZorkInput";
import { ZorkToggle } from "@components/ZorkToggle";
import ZorkTransaction from "@components/ZorkTransaction";

import { getTransactions } from "@services/Transactions/getTransactions";
import { Transaction } from "@services/Transactions/utils";

import { useUser } from "@hooks/useUser";
import { User } from "@services/User/utils";

import { BiMessageDetail } from "react-icons/bi";

import { useEffect, useState } from "react";
import { useRef } from "react";
import Loader from "react-loader-spinner";

import style from "./style.module.scss";
import { createTransaction } from "@services/Transactions/createTransaction";
import { toast } from "react-toastify";

interface IZorkUserCard {
  viewUser: User;
}

const ZorkUserCard: React.FC<IZorkUserCard> = ({ viewUser }: IZorkUserCard) => {
  const { access_token, user, refreshUser } = useUser();

  const [transactions, setTransactions] = useState([] as Transaction[]);
  const [filteredTransactions, setFilteredTransactions] = useState(
    [] as Transaction[]
  );

  const [sentFilter, setSentFilter] = useState(true);
  const [receivedFilter, setReceivedFilter] = useState(true);

  const [zorkValue, setZorkValue] = useState(0);
  const [message, setMessage] = useState("");

  const actionToast = useRef(null);
  const [allowInput, setAllowInput] = useState(true);

  // Check if viewUser is undefined and sets the logged user as the view
  if (viewUser == undefined) {
    viewUser = user;
  }

  const handleTransaction = async () => {
    actionToast.current = toast("Sending Zorks, please wait...", {
      autoClose: false,
    });
    setAllowInput(false);

    const response = await createTransaction(access_token, {
      description: message,
      value: zorkValue,
      id: viewUser.id,
    });

    setAllowInput(true);
    refreshUser();
    if (response.error) {
      toast.update(actionToast.current, {
        type: "error",
        autoClose: 1000,
        render: response.error,
      });
    } else {
      toast.update(actionToast.current, {
        type: "success",
        autoClose: 500,
        render: "Zorks sent!",
      });
    }
  };
  const handleRequest = async () => {};

  useEffect(() => {
    if (!user) {
      setFilteredTransactions(transactions);
      return;
    }

    const filtered = transactions.filter(
      (transaction) =>
        (transaction.from_id == user.id && sentFilter) ||
        (transaction.to_id == user.id && receivedFilter)
    );

    setFilteredTransactions(filtered);
  }, [sentFilter, receivedFilter, transactions]);

  useEffect(() => {
    async function getData() {
      if (!viewUser) {
        setTransactions([]);
        return;
      }

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
            <h2>{viewUser.email}</h2>
          </div>

          {viewUser.id == user.id ? (
            <></>
          ) : (
            <div className={style.userActions}>
              <div className={style.actionsInputs}>
                <ZorkInput
                  disabled={!allowInput}
                  type="number"
                  min={1}
                  icon={
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>Ƶ</p>
                  }
                  placeholder="Total Zorks"
                  width="209px"
                  onChange={(e) => {
                    setZorkValue(parseInt(e.target.value));
                  }}
                />
                <ZorkInput
                  disabled={!allowInput}
                  type="text"
                  icon={<BiMessageDetail size={"24px"} />}
                  placeholder="Message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </div>

              <div className={style.actionsButtons}>
                <ZorkButton text="Send" onClick={handleTransaction} />
                <ZorkButton text="Request" onClick={handleRequest} />
              </div>
            </div>
          )}

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
                unchecked={!sentFilter}
                onToggle={(v) => {
                  setSentFilter(v);
                }}
              />
              <ZorkToggle
                text="Received"
                unchecked={!sentFilter}
                onToggle={(v) => {
                  setReceivedFilter(v);
                }}
              />
            </div>
          </div>

          <div className={style.transactions}>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => {
                return (
                  <ZorkTransaction key={t.id} transaction={t} viewUser={user} />
                );
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
