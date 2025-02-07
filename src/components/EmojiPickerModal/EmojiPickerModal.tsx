import { useEffect, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import styles from "./styles.module.css";

type EmojiPickerModalProps = {
  onClose: () => void;
  onSelect: (emoji: string) => void;
};

export const EmojiPickerModal = ({
  onClose,
  onSelect,
}: EmojiPickerModalProps) => {
  const pickerRef = useRef<HTMLDivElement>(null);

  useClickOutside(pickerRef, onClose);

  useEffect(() => {
    if (pickerRef.current) {
      const picker = document.createElement("emoji-picker");
      picker.addEventListener("emoji-click", (e: any) => {
        onSelect(e.detail.emoji.unicode);
        onClose();
      });

      pickerRef.current.innerHTML = "";
      pickerRef.current.appendChild(picker);
    }
  }, [onSelect, onClose]);

  return (
    <div className={styles.modal_overlay} onMouseDown={onClose}>
      <div
        ref={pickerRef}
        className={styles.modal_content}
        onMouseDown={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
};
