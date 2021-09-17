import { ReactElement } from "react";

import styles from "./style.module.scss";

interface ZorkTextInputProps {
  icon: ReactElement;
  type: string;
  name: string;
  placeholder?: string;
}

const ZorkTextInput: React.FC<ZorkTextInputProps> = ({
  icon,
  name,
  type = "text",
  placeholder = "",
}) => {
  return (
    <div className={styles.zInputText}>
      {icon}
      <div />
      <input type={type} placeholder={placeholder} name={name} />
    </div>
  );
};

export default ZorkTextInput;
