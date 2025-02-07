import styles from "./styles.module.css";

type EmojiCarouselProps = {
  emojis: string[];
};

export const EmojiCarousel = ({ emojis }: EmojiCarouselProps) => {
  return (
    <div className={styles.emoji__carousel}>
      <div className={styles.emoji__carousel__track}>
        {[...emojis, ...emojis].map((emoji, index) => (
          <div
            key={`${emoji}-${index}`}
            className={styles.emoji__carousel__item}
          >
            <span className={styles.emoji}>{emoji}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
