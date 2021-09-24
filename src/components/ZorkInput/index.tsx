import { InputHTMLAttributes } from "hoist-non-react-statics/node_modules/@types/react";
import { HTMLAttributes, ReactElement } from "react";

import styles from "./style.module.scss";

interface IZorkInput {
  icon: ReactElement;
}

const ZorkInput: React.FC<IZorkInput & InputHTMLAttributes<HTMLInputElement>> =
  ({ icon, ...props }: IZorkInput & InputHTMLAttributes<HTMLInputElement>) => {
    return (
      <div className={styles.zInputText}>
        {icon}
        <div />
        <input {...props} />
      </div>
    );
  };

export default ZorkInput;
