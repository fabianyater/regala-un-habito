import styles from "./styles.module.css";

type HabitCardProps = {
  name: string;
  emoji: string;
  isActive?: boolean;
  onClick?: () => void;
};

export const HabitCard = ({
  name,
  emoji,
  isActive,
  onClick,
}: HabitCardProps) => {
  return (
    <div
      className={`${styles.habitCard} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <h2>{name}</h2>
      <span>{emoji}</span>
    </div>
  );
};
