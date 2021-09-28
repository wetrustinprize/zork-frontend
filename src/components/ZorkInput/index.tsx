import { InputHTMLAttributes } from "hoist-non-react-statics/node_modules/@types/react";
import { ReactElement } from "react";

import style from "./style.module.scss";

interface IZorkInput {
  icon: ReactElement;
  width?: string;
}

const ZorkInput: React.FC<IZorkInput & InputHTMLAttributes<HTMLInputElement>> =
  ({
    icon,
    width = "418px",
    ...props
  }: IZorkInput & InputHTMLAttributes<HTMLInputElement>) => {
    return (
      <div
        style={{
          width,
        }}
        className={style.zInputText}
      >
        <div className={style.icon}>{icon}</div>
        <div className={style.divider} />
        <input {...props} />
      </div>
    );
  };

export default ZorkInput;
