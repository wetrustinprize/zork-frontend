import style from "./style.module.scss";

import { FaExchangeAlt } from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";
import { format } from "date-fns";

import { User } from "@services/User/utils";
import { Transaction } from "@services/Transactions/utils";

import Link from "next/link";
interface IZorkTransaction {
  transaction: Transaction;
  viewUser?: User;
}

const ZorkTransaction: React.FC<IZorkTransaction> = ({
  transaction,
  viewUser = undefined,
}: IZorkTransaction) => {
  const { from_user, to_user, description, zorks, created_at } = transaction;
  const date = new Date(created_at);

  return (
    <div className={style.zorkTransaction}>
      <div className={style.zorkIcons}>
        <div className={style.zorkIcon}>
          <p>{from_user.first_name[0]}</p>
        </div>
        <FaExchangeAlt className={style.tradeIcon} size="28px" />
        <div className={style.zorkIcon}>
          <p>{to_user.first_name[0]}</p>
        </div>
      </div>

      <div className={style.zorkInfo}>
        <header>
          <p>
            {viewUser?.id == from_user.id ? (
              <b>You</b>
            ) : (
              <Link
                href={{
                  pathname: "/users",
                  query: { id: from_user.id },
                }}
              >
                <a>
                  <b>@{from_user.first_name}</b>
                </a>
              </Link>
            )}{" "}
            sent <b>{zorks}Ƶ</b> to{" "}
            {viewUser?.id == to_user.id ? (
              <b>You</b>
            ) : (
              <Link
                href={{
                  pathname: "/users",
                  query: { id: to_user.id },
                }}
              >
                <a>
                  <b>@{to_user.first_name}</b>
                </a>
              </Link>
            )}{" "}
          </p>
          {!transaction.public ? (
            <AiFillEyeInvisible className={style.privateIcon} size={"24px"} />
          ) : (
            <></>
          )}
        </header>
        <footer>{description || "No description."}</footer>
      </div>

      <div className={style.zorkTimestamp}>
        <p>{format(date, "MMM. d, h:mm aa")}</p>
      </div>
    </div>
  );
};

export default ZorkTransaction;
