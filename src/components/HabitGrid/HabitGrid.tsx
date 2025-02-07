import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import { Habit } from "../../utils/types";
import { Button } from "../Button/Button";
import { StreakCard } from "../Streak/StreakCard";
import styles from "./styles.module.css";

export const HabitGrid = () => {
  const { id } = useParams();
  const [streak, setStreak] = useState<number>(0);
  const [markedDays, setMarkedDays] = useState<Record<string, string>>({});
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [frozenDays, setFrozenDays] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const storeHabits = localStorage.getItem("habits");
  const habits: Habit[] = storeHabits ? JSON.parse(storeHabits) : [];
  const habit = habits.find((habit) => habit.id === id);
  const today = new Date().toISOString().split("T")[0];
  const totalDays = 365;

  const goalDates = useMemo(
    () =>
      habit?.rewards.map((reward) => {
        const goalDate = new Date();
        goalDate.setDate(goalDate.getDate() + (reward.days - 1));
        return goalDate.toISOString().split("T")[0];
      }) || [],
    [habit]
  );

  useEffect(() => {
    if (!id) return;

    setMarkedDays({});
    setStreak(0);
    setFrozenDays(0);
    setLoading(true);

    const savedProgress = localStorage.getItem(`habit-progress-${id}`);

    if (savedProgress) {
      const { markedDays, streak, frozenDays } = JSON.parse(savedProgress);
      setMarkedDays(markedDays || {});
      setStreak(streak || 0);
      setFrozenDays(frozenDays || 0);
    }

    setLoading(false);
  }, [id]);

  const saveProgress = (
    updatedMarkedDays: Record<string, string>,
    newStreak: number,
    newFrozenDays: number
  ) => {
    if (id) {
      localStorage.setItem(
        `habit-progress-${id}`,
        JSON.stringify({
          markedDays: updatedMarkedDays,
          streak: newStreak,
          frozenDays: newFrozenDays,
        })
      );
    }
  };

  const handleSelectDay = (dateString: string) => {
    const todayDate = new Date(today);
    const maxSelectableDate = new Date(todayDate);
    maxSelectableDate.setDate(todayDate.getDate() + totalDays);

    if (new Date(dateString) > maxSelectableDate) {
      toast.error("No puedes seleccionar una fecha tan lejana.");
      return;
    }

    setSelectedDay(dateString);
  };

  const handleMarkDay = () => {
    if (!selectedDay || markedDays[selectedDay]) {
      toast.error("No puedes marcar un día que ya has marcado.");
      return;
    }

    if (new Date(selectedDay) > new Date(today)) {
      toast.error("No puedes marcar un día que esté en el futuro");
      return;
    }

    const updatedMarkedDays = { ...markedDays, [selectedDay]: "completed" };
    const newStreak = streak + 1;
    setMarkedDays(updatedMarkedDays);
    setStreak(newStreak);
    saveProgress(updatedMarkedDays, newStreak, frozenDays);

    goalDates.forEach((goalDate) => {
      const goalDateObj = new Date(goalDate);
      goalDateObj.setDate(goalDateObj.getDate() - 1);
      const oneDayBeforeGoal = goalDateObj.toISOString().split("T")[0];

      if (oneDayBeforeGoal === selectedDay) {
        toast.success("🚀 ¡Falta solo un día para tu objetivo!");
      }
    });

    if (goalDates.includes(selectedDay)) {
      toast.success("🎉 ¡Felicidades! Has alcanzado tu objetivo.", {
        icon: "🎉",
        style: {
          background: "#6c7af0",
          color: "#fff",
        },
      });
    } else {
      toast.success("Día marcado.");
    }
  };

  const handleUnmarkDay = () => {
    if (!selectedDay || markedDays[selectedDay] !== "completed") return;

    const updatedMarkedDays = { ...markedDays };
    delete updatedMarkedDays[selectedDay];

    const newStreak = streak > 0 ? streak - 1 : 0;
    setMarkedDays(updatedMarkedDays);
    setStreak(newStreak);
    saveProgress(updatedMarkedDays, newStreak, frozenDays);
    toast.success("Día desmarcado.");
  };

  const handleFreezeDay = () => {
    if (!selectedDay) {
      toast.error("Selecciona un día.");
      return;
    }

    if (markedDays[selectedDay] === "completed") {
      toast.error(
        "No puedes congelar un día que ya está marcado como completado."
      );
      return;
    }

    const selectedDate = new Date(selectedDay);
    const todayDate = new Date(today);
    const twoDaysAgo = new Date(todayDate);
    twoDaysAgo.setDate(todayDate.getDate() - 2);

    if (selectedDate > todayDate) {
      toast.error("No puedes congelar un día en el futuro.");
      return;
    }

    if (selectedDate < twoDaysAgo) {
      toast.error("Solo puedes congelar hasta 2 días anteriores.");
      return;
    }

    if (markedDays[selectedDay] === "frozen") {
      handleUnfreezeDay();
      return;
    }

    if (frozenDays >= 2) {
      toast.error("No puedes congelar más de 2 días.");
      return;
    }

    const updatedMarkedDays = { ...markedDays, [selectedDay]: "frozen" };
    setMarkedDays(updatedMarkedDays);
    setFrozenDays(frozenDays + 1);
    saveProgress(updatedMarkedDays, streak, frozenDays + 1);
    toast.success("Día congelado con éxito.");
  };

  const handleUnfreezeDay = () => {
    if (!selectedDay || markedDays[selectedDay] !== "frozen") {
      toast.error("Este día no está congelado.");
      return;
    }

    const updatedMarkedDays = { ...markedDays };
    delete updatedMarkedDays[selectedDay];

    setMarkedDays(updatedMarkedDays);
    setFrozenDays(frozenDays > 0 ? frozenDays - 1 : 0);
    saveProgress(
      updatedMarkedDays,
      streak,
      frozenDays > 0 ? frozenDays - 1 : 0
    );
    toast.success("Día descongelado con éxito.");
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className={styles.container}>
        <aside className={styles.left}>
          <StreakCard
            days={streak}
            onClick={
              selectedDay && markedDays[selectedDay] === "completed"
                ? handleUnmarkDay
                : handleMarkDay
            }
            disabled={!selectedDay}
            style={{
              backgroundColor:
                selectedDay && markedDays[selectedDay] === "completed"
                  ? "#6c7af0"
                  : "#3e3e3e",
              color: "#fff",
            }}
            text={
              selectedDay && markedDays[selectedDay] === "completed"
                ? "Desmarcar día racha"
                : "🔥 Continuar racha"
            }
            status={!!selectedDay && markedDays[selectedDay] === "completed"}
          />
          <Button
            text={
              selectedDay && markedDays[selectedDay] === "frozen"
                ? "❄️ Descongelar día"
                : "🥶 Congelar día"
            }
            onClick={handleFreezeDay}
            disabled={!selectedDay}
            style={{
              backgroundColor:
                selectedDay && markedDays[selectedDay] === "frozen"
                  ? "#62d1ff"
                  : "#00BFFF",
              color: "#3e3e3e",
            }}
          />
        </aside>
        <section className={styles.right}>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <div className={styles.days}>
              {Array.from({ length: totalDays }, (_, i) => {
                const date = new Date();
                date.setDate(new Date().getDate() + i);
                const dateString = date.toISOString().split("T")[0];
                const status = markedDays[dateString] || "unmarked";

                let dayStyle = styles.unmarked;
                if (status === "completed") dayStyle = styles.completed;
                if (status === "frozen") dayStyle = styles.frozen;
                if (goalDates.includes(dateString)) dayStyle = styles.goal;

                return (
                  <div
                    key={dateString}
                    className={`${styles.day} ${dayStyle} ${
                      selectedDay === dateString ? styles.selected : ""
                    }`}
                    onClick={() => handleSelectDay(dateString)}
                    title={goalDates.includes(dateString) ? "Objetivo 🎯" : ""}
                  ></div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
};
