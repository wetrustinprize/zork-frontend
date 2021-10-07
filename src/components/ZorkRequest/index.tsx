import style from "./style.module.scss";

import { format } from "date-fns";

import { User } from "@services/User/utils";
import { Request } from "@services/Requests/utils";
import { methodRequest } from "@services/Requests/methodRequest";

import Link from "next/link";

import ZorkButton from "@components/ZorkButton";

import { useToken } from "@hooks/useToken";
import { useUser } from "@hooks/useUser";

import { toast } from "react-toastify";
interface IZorkTransaction {
  request: Request;
  viewUser?: User;
  onClick: (method: "accept" | "refuse", id: string) => void;
}

const ZorkRequest: React.FC<IZorkTransaction> = ({
  request,
  viewUser = undefined,
  onClick,
}: IZorkTransaction) => {
  const { from_user, to_user, description, zorks, created_at } = request;
  const date = new Date(created_at);

  return (
    <div className={style.zorkRequest}>
      <div className={style.zorkIcons}>
        <div className={request.request_canceled ? style.canceled : undefined}>
          <p>{from_user.first_name[0]}</p>
        </div>
      </div>

      <div className={style.zorkInfo}>
        <header>
          <p className={request.request_canceled ? style.canceled : undefined}>
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
            {request.request_result ? "sent" : "requested"} <b>{zorks}Ƶ</b>{" "}
            {request.request_result ? "to" : "from"}{" "}
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
        </header>
        <footer>
          <p>{description || "No description."}</p>
          {request.request_canceled || request.request_result ? (
            <></>
          ) : (
            <div>
              {request.to_id == viewUser.id ? (
                <ZorkButton
                  text="Accept"
                  onClick={() => {
                    onClick("accept", request.id);
                  }}
                />
              ) : (
                <></>
              )}
              <ZorkButton
                text={request.to_id == viewUser.id ? "Refuse" : "Cancel"}
                onClick={() => {
                  onClick("refuse", request.id);
                }}
              />
            </div>
          )}
        </footer>
      </div>

      <div className={style.zorkTimestamp}>
        <p>{format(date, "MMM. d, h:mm aa")}</p>
      </div>
    </div>
  );
};

export default ZorkRequest;
