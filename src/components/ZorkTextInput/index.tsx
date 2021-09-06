import { InputHTMLAttributes, ReactElement } from "react";

import styles from "./style.module.scss";

interface ZorkTextInputProps {
  icon: ReactElement;
  type: string;
  placeholder?: string;
}

const ZorkTextInput: React.FC<ZorkTextInputProps> = ({
  icon,
  type = "text",
  placeholder = "",
}) => {
  return (
    <div className={styles.zInputText}>
      {icon}
      <div />
      <input type={type} placeholder={placeholder} />
    </div>
  );
};

export default ZorkTextInput;
