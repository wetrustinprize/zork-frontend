import { useState } from "react";

import style from "./style.module.scss";

interface IZorkToggle {
  unchecked?: boolean;
  text: string;
  onToggle?: (newValue: boolean) => void;
}

const ZorkToggle: React.FC<IZorkToggle> = ({
  unchecked = false,
  text,
  onToggle = () => {},
}: IZorkToggle) => {
  const [marked, setMarked] = useState(!unchecked);

  return (
    <button
      className={marked ? style.toggleTrue : style.toggleFalse}
      onClick={() => {
        setMarked(!marked);
        onToggle(marked);
      }}
    >
      {text}
    </button>
  );
};

export { ZorkToggle };
