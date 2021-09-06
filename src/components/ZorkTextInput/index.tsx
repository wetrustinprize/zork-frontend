import { InputHTMLAttributes, ReactElement } from "react";

import styles from "./style.module.scss";

interface ZorkTextInputProps {
  icon: ReactElement;
  type: string;
}

const ZorkTextInput: React.FC<ZorkTextInputProps> = ({
  icon,
  type = "text",
}) => {
  return (
    <div className={styles.zInputText}>
      {icon}
      <div />
      <input type={type} />
    </div>
  );
};

export default ZorkTextInput;
