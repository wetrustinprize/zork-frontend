import ZorkLayout from "@components/ZorkLayout";
import ZorkSidebar from "@components/ZorkSidebar";
import { ZorkToggle } from "@components/ZorkToggle";
import ZorkRequest from "@components/ZorkRequest";

import { Request } from "@services/Requests/utils";
import { getRequests } from "@services/Requests/getRequests";
import { useUser } from "@hooks/useUser";

import { NextPageWithLayout } from "@pages/utils";

import { useState, useEffect } from "react";

import style from "./style.module.scss";

import Loader from "react-loader-spinner";

const Transactions: NextPageWithLayout = () => {
  const [requests, setRequests] = useState([] as Request[]);
  const [filteredRequests, setFilteredRequests] = useState([] as Request[]);

  const [sentFilter, setSentFilter] = useState(true);
  const [receivedFilter, setReceivedFilter] = useState(true);

  const { access_token, user } = useUser("/login");

  const handleAccept = () => {};
  const handleCancel = () => {};

  useEffect(() => {
    async function getData() {
      const r = await getRequests(access_token);
      setRequests(r);
    }

    getData();
  }, [access_token, user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const filtered = requests
      .sort((r) => (r.request_canceled ? 1 : -1))
      .filter(
        (request) =>
          (request.from_id == user.id && sentFilter) ||
          (request.to_id == user.id && receivedFilter)
      );

    setFilteredRequests(filtered);
  }, [requests, sentFilter, receivedFilter]);

  return (
    <div className={style.container}>
      <header>
        <h1>Your Zork requests</h1>
        <div>
          <ZorkToggle
            text="Sent"
            unchecked={!sentFilter}
            onToggle={(v) => {
              setSentFilter(v);
            }}
          />
          <ZorkToggle
            text="Received"
            unchecked={!receivedFilter}
            onToggle={(v) => {
              setReceivedFilter(v);
            }}
          />
        </div>
      </header>

      <main className={!user ? style.loading : style.requests}>
        {!user ? (
          <Loader type="Puff" />
        ) : filteredRequests.length > 0 ? (
          filteredRequests.map((r) => {
            return (
              <ZorkRequest
                key={r.id}
                request={r}
                viewUser={user}
                onAccept={handleAccept}
                onCancel={handleCancel}
              />
            );
          })
        ) : (
          <div className={style.empty}>Nothing here :(</div>
        )}
      </main>
    </div>
  );
};

Transactions.getLayout = (page) => {
  return (
    <ZorkLayout>
      <ZorkSidebar />
      {page}
    </ZorkLayout>
  );
};

export default Transactions;
