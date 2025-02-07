import "emoji-picker-element";
import styles from "./styles.module.css";

type InputProps = {
  label: string;
  placeholder: string;
  selectedEmoji?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onEmojiClick?: (emoji: string) => void;
  isTextArea?: boolean;
  showEmojiPicker?: boolean;
  type?: "text" | "number";
  min?: number;
  max?: number;
};

export const Input = ({
  label,
  placeholder,
  selectedEmoji = "",
  onChange,
  onEmojiClick,
  isTextArea = false,
  showEmojiPicker = false,
  type = "text",
  min,
  max,
}: InputProps) => {
  return (
    <label>
      {label}
      {isTextArea ? (
        <textarea
          cols={40}
          rows={20}
          placeholder={placeholder}
          onChange={onChange}
        ></textarea>
      ) : (
        <div>
          <input
            min={min}
            max={max}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className={styles.input}
          />
          {showEmojiPicker && onEmojiClick && (
            <span
              className={styles.input__icon}
              onClick={() => {
                onEmojiClick(selectedEmoji);
              }}
            >
              {selectedEmoji}
            </span>
          )}
        </div>
      )}
    </label>
  );
};
