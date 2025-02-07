import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { CongratsModal } from "../../components/CongratsModal/CongratsModal";
import { HabitCard } from "../../components/HabitCard/HabitCard";
import { Habit } from "../../utils/types";
import styles from "./styles.module.css";

export const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const storedHabits = localStorage.getItem("habits");
    return storedHabits ? JSON.parse(storedHabits) : [];
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const id = useParams().id;
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const hasNewHabit = habits.some((habit) => habit.isNewHabit);
    setShowModal(hasNewHabit);
  }, [habits]);

  const markHabitAsSeen = () => {
    const updatedHabits = habits.map((habit) =>
      habit.isNewHabit ? { ...habit, isNewHabit: false } : habit
    );

    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    setHabits(updatedHabits);
  };

  return (
    <>
      {showModal && (
        <CongratsModal
          onClose={handleClose}
          markHabitAsSeen={markHabitAsSeen}
        />
      )}
      <div className={styles.container}>
        <header>
          <h1>Hábitos</h1>
          <div className={styles.habits}>
            {habits.length > 0 &&
              habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  name={habit.type}
                  emoji={habit.emoji}
                  isActive={id ? habit.id === id : false}
                  onClick={() => navigate(`/habitos/${habit.id}`)}
                />
              ))}
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
