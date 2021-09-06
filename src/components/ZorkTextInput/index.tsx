import { ReactElement } from "react";

import styles from "./style.module.scss";

interface ZorkTextInputProps {
  icon: ReactElement;
}

const ZorkTextInput: React.FC<ZorkTextInputProps> = ({ icon }) => {
  return (
    <div className={styles.zInputText}>
      {icon}
      <div />
      <input type="text" />
    </div>
  );
};

export default ZorkTextInput;
