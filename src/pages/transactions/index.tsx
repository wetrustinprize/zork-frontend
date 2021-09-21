import ZorkLayout from "@components/ZorkLayout";
import ZorkSidebar from "@components/ZorkSidebar";
import { NextPageWithLayout } from "@pages/utils";

import type { ReactElement } from "react";

const Transactions: NextPageWithLayout = () => {
  return <></>;
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
