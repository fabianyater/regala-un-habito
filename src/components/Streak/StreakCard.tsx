import { useEffect, useState } from "react";
import ConfettinExplosion from "react-confetti-explosion";
import { Button } from "../Button/Button";
import styles from "./styles.module.css";

type StreakCardProps = {
  days: number;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  text?: string;
  status: boolean;
};

export const StreakCard = ({
  days,
  onClick,
  style,
  disabled,
  text,
  status,
}: StreakCardProps) => {
  const [isExploding, setIsExploding] = useState<boolean>(false);

  const handleClick = () => {
    if (onClick) onClick();
    setIsExploding(true);
  };

  useEffect(() => {
    if (isExploding) {
      setTimeout(() => setIsExploding(false), 2000);
    }
  }, [isExploding]);

  return (
    <div className={styles.card}>
      {status && isExploding && <ConfettinExplosion />}
      <span className={styles.streakText}>Tu racha de días seguidos:</span>
      <div className={styles.streak}>
        <span className={styles.text}>{days}</span>
        <span className={styles.days}>{days}</span>
      </div>
      <Button
        text={text}
        onClick={handleClick}
        disabled={disabled}
        style={style}
      />
    </div>
  );
};
