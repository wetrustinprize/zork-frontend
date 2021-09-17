import styles from "./style.module.scss";

interface ZorkButtonProps {
  text: string;
  isSubmit?: boolean;
}

const ZorkButton: React.FC<ZorkButtonProps> = ({ text, isSubmit = false }) => {
  return isSubmit ? (
    <input type="submit" className={styles.zbutton} value={text} />
  ) : (
    <button className={styles.zbutton}>{text}</button>
  );
};

export default ZorkButton;
