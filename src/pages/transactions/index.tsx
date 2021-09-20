import ZorkSidebar from "@components/ZorkSidebar";

import style from "./style.module.scss";

const Transactions: React.FC = () => {
  return (
    <main className={style.transaction_screen}>
      <ZorkSidebar />
    </main>
  );
};

export default Transactions;
