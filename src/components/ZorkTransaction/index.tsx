import style from "./style.module.scss";

import { FaExchangeAlt } from "react-icons/fa";
import { format } from "date-fns";

interface IZorkTransaction {
  transaction: any;
}

const ZorkTransaction: React.FC<IZorkTransaction> = ({
  transaction,
}: IZorkTransaction) => {
  const { from_user, to_user, description, zorks, created_at } = transaction;
  const date = new Date(created_at);

  return (
    <div className={style.zorkTransaction}>
      <div className={style.zorkIcons}>
        <div className={style.zorkIcon}>
          <p>{from_user.first_name[0]}</p>
        </div>
        <FaExchangeAlt size="28px" />
        <div className={style.zorkIcon}>
          <p>{to_user.first_name[0]}</p>
        </div>
      </div>

      <div className={style.zorkInfo}>
        <header>
          <b>@{from_user.first_name}</b> sent <b>{zorks}Ƶ</b> to{" "}
          <b>@{to_user.first_name}!</b>
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
