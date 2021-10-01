import { useUser } from "@services/User/useUser";
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

interface IZorkSidebarButton {
  text: string;
  path: string;
  icon: ReactElement;
  textBubble?: string;
}

const ZorkSidebarButton: React.FC<
  IZorkSidebarButton & HTMLAttributes<HTMLButtonElement>
> = ({
  text,
  path,
  icon,
  textBubble = "",
  ...props
}: IZorkSidebarButton & HTMLAttributes<HTMLButtonElement>) => {
  const router = useRouter();
  const selected = router.pathname == path;

  return (
    <button
      {...props}
      className={style.zorkSidebarButton}
      onClick={() => {
        router.push(path);
      }}
    >
      <div className={selected ? style.selected : undefined} />
      {icon}
      <p>{text}</p>
      {textBubble != "" ? <label>{textBubble}</label> : <></>}
    </button>
  );
};

// TODO: Make the user logout
interface IZorkSidebarLogoutButton {}
const ZorkSidebarLogoutButton: React.FC<IZorkSidebarLogoutButton> = () => {
  return (
    <button className={style.zorkSidebarLogoutButton}>
      {<AiOutlineLogout size="36px" />}
    </button>
  );
};

const ZorkSidebar: React.FC = () => {
  const { user } = useUser();

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
        />
        <ZorkSidebarButton
          icon={<AiOutlineUser size="32px" />}
          text="Users"
          path="/users"
        />
        <ZorkSidebarButton
          icon={<AiOutlineTransaction size="32px" />}
          text="Transactions"
          path="/transactions"
        />
        <ZorkSidebarButton
          icon={<AiOutlineInfoCircle size="32px" />}
          text="Requests"
          path="/requests"
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
        <ZorkSidebarLogoutButton />
      </footer>
    </div>
  );
};

export default ZorkSidebar;
