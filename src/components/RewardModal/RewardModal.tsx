import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Reward } from "../../utils/types";
import { Button } from "../Button/Button";
import { EmojiPickerModal } from "../EmojiPickerModal/EmojiPickerModal";
import { Input } from "../Input/Input";
import { CloseIcon } from "../SvgIcon/SvgIcon";
import styles from "./styles.module.css";

type RewardModalProps = {
  onClose: () => void;
  onAddReward: (reward: Reward) => void;
};

export const RewardModal = ({ onClose, onAddReward }: RewardModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("💪");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState<number>(1);
  const [shake, setShake] = useState<boolean>(false);


  const handleAdd = () => {

    
    if (!title || !days) {
      setShake(true);
      setTimeout(() => setShake(false), 1000);
      return;
    };

    console.log(description);
    


    const newReward: Reward = {
      id: Date.now(),
      days,
      title,
      description,
      emoji: selectedEmoji,
    };

    onAddReward(newReward);
    onClose();
  };

  useClickOutside(modalRef, onClose);

  return (
    <div className={styles.modal_overlay}>
      <article className={`${styles.modal} ${shake && styles.shake}`} ref={modalRef}>
        <header className={styles.modal__header}>
          <h2 className={styles.modal__title}>Agregar nueva recompensa</h2>
          <Button icon={<CloseIcon />} onClick={onClose} />
        </header>
        <main className={styles.modal__content}>
          <form className={styles.modal__form}>
            <div className={styles.modal__form__group}>
              <Input
                label="Día"
                type="number"
                min={1}
                placeholder="7"
                onChange={(e) => setDays(Number(e.target.value))}
              />
              <Input
                label="Título"
                placeholder="Helado"
                onChange={(e) => setTitle(e.target.value)}
                selectedEmoji={selectedEmoji}
                onEmojiClick={() => setShowPicker((prev) => !prev)}
                showEmojiPicker
              />
            </div>
            <div className={styles.modal__form__group}>
              <Input
                isTextArea
                label="Descripción (opcional)"
                placeholder="Escribe aquí"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </form>
        </main>
        <footer>
          <Button text="Guardar" onClick={handleAdd} />
        </footer>
      </article>
      {showPicker && (
        <EmojiPickerModal
          onClose={() => setShowPicker(false)}
          onSelect={(emoji) => setSelectedEmoji(emoji)}
        />
      )}
    </div>
  );
};
