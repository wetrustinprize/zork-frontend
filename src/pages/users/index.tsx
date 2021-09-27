import { NextPageWithLayout } from "@pages/utils";

import ZorkLayout from "@components/ZorkLayout";
import ZorkSidebar from "@components/ZorkSidebar";
import ZorkUserCard from "@components/ZorkUserCard";

import { IoMdSearch } from "react-icons/io";

import style from "./style.module.scss";

const Users: NextPageWithLayout = () => {
  return (
    <main className={style.usersMain}>
      <header>
        <h1>Users</h1>

        <div className={style.searchBar}>
          <IoMdSearch size={"40px"} />
          <input type="text" placeholder="User email..." />
        </div>
      </header>

      <ZorkUserCard />
    </main>
  );
};

Users.getLayout = (page) => {
  return (
    <ZorkLayout>
      <ZorkSidebar />
      {page}
    </ZorkLayout>
  );
};

export default Users;
