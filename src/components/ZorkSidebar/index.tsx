import { ReactElement } from "hoist-non-react-statics/node_modules/@types/react";
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineLogout,
  AiOutlineTransaction,
  AiOutlineUser,
} from "react-icons/ai";
import style from "./style.module.scss";

interface IZorkSidebarButton {
  text: string;
  icon: ReactElement;
  textBubble?: string;
  selected?: boolean;
}

const ZorkSidebarButton: React.FC<IZorkSidebarButton> = ({
  text,
  icon,
  selected = false,
  textBubble = "",
}: IZorkSidebarButton) => {
  return (
    <button className={style.zorkSidebarButton}>
      <div className="test" />
      {icon}
      <p>{text}</p>
      {textBubble != "" ? <label>{textBubble}</label> : <></>}
    </button>
  );
};

interface IZorkSidebarLogoutButton {}
const ZorkSidebarLogoutButton: React.FC<IZorkSidebarLogoutButton> = () => {
  return (
    <button className={style.zorkSidebarLogoutButton}>
      {<AiOutlineLogout size="36px" />}
    </button>
  );
};

const ZorkSidebar: React.FC = () => {
  return (
    <div className={style.zorkSidebar}>
      <h1>Zork</h1>

      <main>
        <ZorkSidebarButton icon={<AiOutlineHome size="32px" />} text="Home" />
        <ZorkSidebarButton icon={<AiOutlineUser size="32px" />} text="Users" />
        <ZorkSidebarButton
          selected
          icon={<AiOutlineTransaction size="32px" />}
          text="Transactions"
        />
        <ZorkSidebarButton
          icon={<AiOutlineInfoCircle size="32px" />}
          text="Requests"
          textBubble="4"
        />
      </main>

      <ZorkSidebarLogoutButton />
    </div>
  );
};

export default ZorkSidebar;
