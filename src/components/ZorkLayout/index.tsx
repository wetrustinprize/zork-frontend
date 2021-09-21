import { ReactNode } from "react";

import style from "./style.module.scss";

interface IZorkLayout {
  children?: ReactNode;
}

const ZorkLayout: React.FC<IZorkLayout> = ({ children }: IZorkLayout) => {
  return <main className={style.zorkLayout}>{children}</main>;
};

export default ZorkLayout;
