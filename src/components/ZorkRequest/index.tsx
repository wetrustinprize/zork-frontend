import style from "./style.module.scss";

import { FaExchangeAlt } from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";
import { format } from "date-fns";

import { User } from "@services/User/utils";
import { Request } from "@services/Requests/utils";

import Link from "next/link";
import ZorkButton from "@components/ZorkButton";
interface IZorkTransaction {
  request: Request;
  viewUser?: User;
}

const ZorkRequest: React.FC<IZorkTransaction> = ({
  request,
  viewUser = undefined,
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
                <ZorkButton text="Accept" />
              ) : (
                <></>
              )}
              <ZorkButton
                text={request.to_id == viewUser.id ? "Refuse" : "Cancel"}
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
