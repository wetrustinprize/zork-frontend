import ZorkButton from "@components/ZorkButton";
import ZorkInput from "@components/ZorkInput";
import ZorkTransaction from "@components/ZorkTransaction";

import style from "./style.module.scss";

const ZorkUserCard: React.FC = () => {
  return (
    <div className={style.zorkUserCard}>
      <div className={style.userInfo}>
        <h1>Peterson Adami Candido</h1>
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

      <h1 className={style.transactionHeader}>
        Your transactions with <strong>Peterson</strong>
      </h1>

      <div className={style.transactions}>
        <ZorkTransaction
          transaction={{
            from_user: {
              first_name: "Peterson",
            },
            to_user: {
              first_name: "Peterson",
            },
            created_at: "2021-02-03",
          }}
        />
        <ZorkTransaction
          transaction={{
            from_user: {
              first_name: "Peterson",
            },
            to_user: {
              first_name: "Peterson",
            },
            created_at: "2021-02-03",
          }}
        />
        <ZorkTransaction
          transaction={{
            from_user: {
              first_name: "Peterson",
            },
            to_user: {
              first_name: "Peterson",
            },
            created_at: "2021-02-03",
          }}
        />
        <ZorkTransaction
          transaction={{
            from_user: {
              first_name: "Peterson",
            },
            to_user: {
              first_name: "Peterson",
            },
            created_at: "2021-02-03",
          }}
        />
        <ZorkTransaction
          transaction={{
            from_user: {
              first_name: "Peterson",
            },
            to_user: {
              first_name: "Peterson",
            },
            created_at: "2021-02-03",
          }}
        />
        <ZorkTransaction
          transaction={{
            from_user: {
              first_name: "Peterson",
            },
            to_user: {
              first_name: "Peterson",
            },
            created_at: "2021-02-03",
          }}
        />
      </div>
    </div>
  );
};

export default ZorkUserCard;
