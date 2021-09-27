import { MouseEventHandler } from "hoist-non-react-statics/node_modules/@types/react";
import styles from "./style.module.scss";

interface ZorkButtonProps {
  text: string;
  isSubmit?: boolean;
  onClick?: () => void;
}

const ZorkButton: React.FC<ZorkButtonProps> = ({
  text,
  isSubmit = false,
  onClick = () => {},
}) => {
  return isSubmit ? (
    <input type="submit" className={styles.zbutton} value={text} />
  ) : (
    <button className={styles.zbutton} onClick={onClick}>
      {text}
    </button>
  );
};

export default ZorkButton;
