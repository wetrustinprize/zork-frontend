import { HTMLAttributes } from "react";

import style from "./style.module.scss";

const ZorkContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <main className={style.container}>{children}</main>
    </div>
  );
};

export { ZorkContainer };
