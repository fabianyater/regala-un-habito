import { Reward } from "../../utils/types";
import { DeleteIcon } from "../SvgIcon/SvgIcon";
import styles from "./styles.module.css";

type RewardCardProps = {
  reward: Reward;
  onDelete?: () => void;
};

export const RewardCard = ({ reward, onDelete }: RewardCardProps) => {
  const { emoji, days, title, description } = reward;

  return (
    <article className={styles.reward__card}>
      <div className={styles.reward__card__delete} onClick={onDelete}>
        <DeleteIcon />
      </div>
      <div className={styles.reward__card__wrapper}>
        <header className={styles.reward__card__header}>
          <div className={styles.reward__card__day}>
            <span className={styles.reward__card__text}>Día</span>
            <h2>{days}</h2>
          </div>
          <span className={styles.reward__card__emoji}>{emoji}</span>
        </header>
        <div className={styles.reward__card__main}>
          <h3 className={styles.reward__card__title}>{title}</h3>
          <div className={styles.reward__card__description}>
            <span>{description}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
