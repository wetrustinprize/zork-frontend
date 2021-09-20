import React, { ChangeEventHandler, ReactElement } from "react";

import styles from "./style.module.scss";

interface ZorkTextInputProps {
  icon: ReactElement;
  type: string;
  name: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ZorkTextInput: React.FC<ZorkTextInputProps> = ({
  icon,
  name,
  type = "text",
  placeholder = "",
  onChange = null,
}) => {
  return (
    <div className={styles.zInputText}>
      {icon}
      <div />
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default ZorkTextInput;
