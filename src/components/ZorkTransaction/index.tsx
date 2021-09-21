import style from "./style.module.scss";

import { FaExchangeAlt } from "react-icons/fa";

const ZorkTransaction: React.FC = () => {
  return (
    <div className={style.zorkTransaction}>
      <div className={style.zorkIcons}>
        <div className={style.zorkIcon}>
          <p>L</p>
        </div>
        <FaExchangeAlt size="28px" />
        <div className={style.zorkIcon}>
          <p>G</p>
        </div>
      </div>

      <div className={style.zorkInfo}>
        <header>
          <b>@Lorena</b> sent <b>30Ƶ</b> to <b>@Gustavo!</b>
        </header>
        <footer>Aquele dinheiro que perdi na aposta.</footer>
      </div>

      <div className={style.zorkTimestamp}>
        <p>Dec. 29, 2:35 PM</p>
      </div>
    </div>
  );
};

export default ZorkTransaction;
