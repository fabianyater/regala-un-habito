import { useState } from "react";
import ReactConfetti from "react-confetti";
import { useNavigate } from "react-router";
import { useWindowSize } from "react-use";
import HabitTracker from "../../assets/habit-tracker.svg";
import { Habit } from "../../utils/types";
import { Button } from "../Button/Button";
import { ChevronRightIcon } from "../SvgIcon/SvgIcon";
import styles from "./styles.module.css";

type CongratsModalProps = {
  onClose: () => void;
  markHabitAsSeen: () => void;
};

export const CongratsModal = ({
  onClose,
  markHabitAsSeen,
}: CongratsModalProps) => {
  const [nextStep, setNextStep] = useState<boolean>(false);
  const { width, height } = useWindowSize();
  const habitsFromLocalStorage = localStorage.getItem("habits");
  const habits: Habit[] = habitsFromLocalStorage
    ? JSON.parse(habitsFromLocalStorage)
    : null;
  const currentHabit = habits.find((habit) => habit.isNewHabit);
  const navigate = useNavigate();

  return (
    <>
      <ReactConfetti width={width} height={height} />
      <div className={styles.overlay}>
        <div className={styles.modal}>
          {!nextStep ? (
            <div className={styles.wrapper}>
              <div className={styles.content}>
                <h2 className={styles.title}>¡Felicidades! 🎉</h2>
                <p>Te han regalado uno de los mejores regalos</p>
                <p>¡Disfruta de tu nuevo hábito!</p>
              </div>
              <Button
                text="¿Qué sigue ahora?"
                onClick={() => setNextStep(true)}
                icon={<ChevronRightIcon />}
                iconPosition="right"
              />
            </div>
          ) : (
            <div className={styles.habit}>
              <img src={HabitTracker} alt="habit-tracker" />
              <article>
                <header>
                  <h2>Tu hábito</h2>
                  <span>{currentHabit?.type}</span>
                  <p>
                    Durante las próximas semanas, recibirás recompensas
                    motivadoras por mantener tu racha y, antes de que te des
                    cuenta, ¡habrás creado un nuevo hábito!
                  </p>
                </header>
                <Button
                  text="¡Empieza ahora! 🚀"
                  onClick={() => {
                    markHabitAsSeen();
                    onClose();
                    navigate(`/habitos/${currentHabit?.id}`);
                  }}
                />
              </article>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
