import styles from "./styles.module.css";

type ButtonProps = {
  text?: string;
  onClick: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  style?: React.CSSProperties;
};

export const Button = ({
  text,
  onClick,
  icon,
  iconPosition = "left",
  disabled,
  style
}: ButtonProps) => {
  const isIconOnly = !text && icon;
  const isTextOnly = text && !icon;
  return (
    <button
      style={style}
      disabled={disabled}
      className={`${styles.button} ${
        isIconOnly ? styles.button__iconOnly : ""
      } ${isTextOnly ? styles.button__textOnly : ""}`}
      onClick={onClick}
      aria-label={isIconOnly && typeof icon === "string" ? icon : undefined}
    >
      {icon && iconPosition === "left" && (
        <span className={styles.button__icon}>{icon}</span>
      )}
      {text && <span className={styles.button__text}>{text}</span>}
      {icon && iconPosition === "right" && (
        <span className={styles.button__icon}>{icon}</span>
      )}
    </button>
  );
};
