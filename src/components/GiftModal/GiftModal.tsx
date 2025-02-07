import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Button } from "../Button/Button";
import { CopyIcon } from "../SvgIcon/SvgIcon";
import styles from "./styles.module.css";
import { QRCodeCanvas } from "qrcode.react";

type GiftModalProps = {
  habitShareLink: string;
  onClose: () => void;
};

export const GiftModal = ({ habitShareLink, onClose }: GiftModalProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const giftRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(habitShareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  useClickOutside(giftRef, onClose);

  return (
    <div className={styles.overlay} onMouseDown={onClose} ref={giftRef}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>¡Comparte tu regalo!</h2>
        <div className={styles.qr}>
          <QRCodeCanvas value={habitShareLink} size={200} />
        </div>
        <div className={styles.content}>
          <span>{habitShareLink}</span>
          <Button
            text={copied ? "¡Copiado!" : "Copiar"}
            icon={!copied ? <CopyIcon /> : ""}
            onClick={handleCopy}
          />
        </div>
      </div>
    </div>
  );
};
