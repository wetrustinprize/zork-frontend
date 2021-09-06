import styles from "./style.module.scss";

interface ZorkButtonProps {
  text: string;
}

const ZorkButton: React.FC<ZorkButtonProps> = ({ text }) => {
  return <button className={styles.zbutton}>{text}</button>;
};

export default ZorkButton;
