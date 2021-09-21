import ZorkLayout from "@components/ZorkLayout";
import ZorkSidebar from "@components/ZorkSidebar";
import ZorkTransaction from "@components/ZorkTransaction";

import { NextPageWithLayout } from "@pages/utils";

import type { ReactElement } from "react";

import style from "./style.module.scss";

const Transactions: NextPageWithLayout = () => {
  return (
    <div className={style.container}>
      <h1>Latest Zork transactions</h1>

      <main>
        <ZorkTransaction />
        <ZorkTransaction />
        <ZorkTransaction />
        <ZorkTransaction />
        <ZorkTransaction />
        <ZorkTransaction />
        <ZorkTransaction />
        <ZorkTransaction />
        <ZorkTransaction />
        <ZorkTransaction />
        <ZorkTransaction />
        <ZorkTransaction />
        <ZorkTransaction />
        <ZorkTransaction />
        <ZorkTransaction />
        <ZorkTransaction />
      </main>
    </div>
  );
};

Transactions.getLayout = (page: ReactElement) => {
  return (
    <ZorkLayout>
      <ZorkSidebar />
      {page}
    </ZorkLayout>
  );
};

export default Transactions;
