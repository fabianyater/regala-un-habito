import "emoji-picker-element";
import { useRef, useState } from "react";
import "./App.css";
import { Button } from "./components/Button/Button";
import { EmojiCarousel } from "./components/EmojiCarousel/EmojiCarousel";
import { EmojiPickerModal } from "./components/EmojiPickerModal/EmojiPickerModal";
import { GiftModal } from "./components/GiftModal/GiftModal";
import { Input } from "./components/Input/Input";
import { RewardCard } from "./components/RewardCard/RewardCard";
import { RewardModal } from "./components/RewardModal/RewardModal";
import { Select } from "./components/Select/Select";
import { PlusIcon, ShareIcon } from "./components/SvgIcon/SvgIcon";
import { useReward } from "./hooks/useReward";
import { emojis } from "./utils/emojis";
import { base64UrlEncode } from "./utils/generateToken";
import { StreakOption, streakOptions } from "./utils/streakOptions";
import { Habit } from "./utils/types";

function App() {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("💪");
  const [habitType, setHabitType] = useState<string>("");
  const [habitDuration, setHabitDuration] = useState<StreakOption>("Diario");
  const [shake, setShake] = useState<boolean>(false);
  const [habitShareLink, setHabitShareLink] = useState<string>("");
  const [showGiftModal, setShowGiftModal] = useState<boolean>(false);
  const { rewards, addReward, deleteReward } = useReward();
  const formRef = useRef<HTMLDivElement>(null);

  const handleShare = () => {
    if (!habitType || !habitDuration) {
      setShake(true);
      setTimeout(() => setShake(false), 1000);
      return;
    }

    const habit: Habit = {
      id: new Date().getTime().toString(),
      type: habitType,
      emoji: selectedEmoji,
      iteration: 1,
      rewards: rewards,
      isNewHabit: true,
    };

    const habitShareLink = base64UrlEncode(habit);
    setHabitShareLink(habitShareLink);
    setShowGiftModal(true);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as StreakOption;
    if (streakOptions.includes(value)) {
      setHabitDuration(value);
    }
  };

  return (
    <>
      <div className="app">
        <section className="hero__container">
          <div className="hero">
            <h1 className="hero__title">
              Un pequeño hábito puede ser el inicio de algo grande
            </h1>
            <p className="hero_subtitle">Por eso quiero regalarte uno</p>
          </div>
        </section>
        <EmojiCarousel emojis={emojis} />
        <main className="main__container">
          <section className="section__container">
            <h2>Regala un Hábito</h2>
            <div className="habit" ref={formRef}>
              <div className="habit__form">
                <div className={`habit__type ${shake ? "shake" : ""}`}>
                  <Input
                    label="Tipo de hábito"
                    placeholder="Gym"
                    onChange={(e) => setHabitType(e.target.value)}
                    onEmojiClick={() => setShowPicker((prev) => !prev)}
                    selectedEmoji={selectedEmoji}
                    showEmojiPicker
                  />
                  <Select
                    label="Duración del hábito"
                    options={streakOptions}
                    onChange={handleSelectChange}
                  />
                </div>
                <div className="habit__reward">
                  <span className="reward__label">
                    Recompensa
                    {rewards.length > 0 && (
                      <Button
                        icon={<PlusIcon />}
                        onClick={() => setOpenModal(true)}
                      />
                    )}
                  </span>

                  {rewards.length < 1 && (
                    <div
                      className="reward__empty"
                      onClick={() => setOpenModal(true)}
                    >
                      <PlusIcon />
                      <span>Agregar nueva</span>
                    </div>
                  )}

                  <div className="reward__list">
                    {rewards.map((reward) => (
                      <RewardCard
                        key={reward.id}
                        reward={reward}
                        onDelete={() => deleteReward(reward)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Button
                text="Compartir hábito"
                icon={<ShareIcon />}
                onClick={handleShare}
              />
            </div>
          </section>
        </main>
      </div>
      {showPicker && (
        <EmojiPickerModal
          onClose={() => setShowPicker(false)}
          onSelect={(emoji) => setSelectedEmoji(emoji)}
        />
      )}
      {openModal && (
        <RewardModal
          onClose={() => setOpenModal(false)}
          onAddReward={addReward}
        />
      )}
      {showGiftModal && (
        <GiftModal
          habitShareLink={habitShareLink}
          onClose={() => setShowGiftModal(false)}
        />
      )}
    </>
  );
}

export default App;
