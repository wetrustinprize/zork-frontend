import { ReactElement } from "react";

import style from "./style.module.scss";

interface IZorkContainer {
  children: ReactElement;
}

const ZorkContainer: React.FC = ({ children }: IZorkContainer) => {
  return <div className={style.container}>{children}</div>;
};

export { ZorkContainer };
