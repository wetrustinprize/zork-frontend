import { useUser } from "@hooks/useUser";
import {
  HTMLAttributes,
  ReactElement,
} from "hoist-non-react-statics/node_modules/@types/react";
import { useRouter } from "next/router";
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineLogout,
  AiOutlineTransaction,
  AiOutlineUser,
} from "react-icons/ai";
import style from "./style.module.scss";
import Link from "next/link";
import { useCookies } from "react-cookie";

interface IZorkSidebarButton {
  text: string;
  path: string;
  icon: ReactElement;
  onClick: (path: string) => void;
  textBubble?: string;
}

const ZorkSidebarButton: React.FC<IZorkSidebarButton> = ({
  text,
  path,
  icon,
  textBubble = "",
  onClick,
}: IZorkSidebarButton) => {
  const router = useRouter();
  const selected = router.pathname == path;

  return (
    <button
      className={style.zorkSidebarButton}
      onClick={() => {
        onClick(path);
      }}
    >
      <div className={selected ? style.selected : undefined} />
      {icon}
      <p>{text}</p>
      {textBubble != "" ? <label>{textBubble}</label> : <></>}
    </button>
  );
};

interface IZorkSidebarLogoutButton {
  onClick: () => void;
}
const ZorkSidebarLogoutButton: React.FC<IZorkSidebarLogoutButton> = ({
  onClick,
}: IZorkSidebarLogoutButton) => {
  return (
    <button className={style.zorkSidebarLogoutButton} onClick={onClick}>
      {<AiOutlineLogout size="36px" />}
    </button>
  );
};

const ZorkSidebar: React.FC = () => {
  const { user } = useUser();
  const [, , removeCookie] = useCookies(["access_token"]);
  const Router = useRouter();

  const logoutUser = () => {
    Router.push("/logout", "/");
  };

  const pathRedir = (path: string) => {
    Router.push(path);
  };

  return (
    <div className={style.zorkSidebar}>
      <header>
        <h1>Zork</h1>
        {user ? (
          <>
            <h2>
              <Link href={{ pathname: "/users", query: { id: user.id } }}>
                <a>{user?.first_name}</a>
              </Link>
            </h2>
            <h2>{user?.email}</h2>
            <h2>Ƶ {user?.zorks.toLocaleString("pt-br")}</h2>
          </>
        ) : (
          <></>
        )}
      </header>

      <main>
        <ZorkSidebarButton
          icon={<AiOutlineHome size="32px" />}
          text="Home"
          path="/global"
          onClick={pathRedir}
        />
        <ZorkSidebarButton
          icon={<AiOutlineUser size="32px" />}
          text="Users"
          path="/users"
          onClick={pathRedir}
        />
        <ZorkSidebarButton
          icon={<AiOutlineTransaction size="32px" />}
          text="Transactions"
          path="/transactions"
          onClick={pathRedir}
        />
        <ZorkSidebarButton
          icon={<AiOutlineInfoCircle size="32px" />}
          text="Requests"
          path="/requests"
          onClick={pathRedir}
          textBubble={
            user?.total_requests
              ? user.total_requests > 0
                ? user.total_requests > 99
                  ? "99+"
                  : user.total_requests.toString()
                : ""
              : ""
          }
        />
      </main>

      <footer>
        <ZorkSidebarLogoutButton onClick={logoutUser} />
      </footer>
    </div>
  );
};

export default ZorkSidebar;
