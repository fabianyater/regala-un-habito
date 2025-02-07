import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  base64UrlDecode,
  rewardBase64UrlEncode,
} from "../../utils/generateToken";
import { Habit } from "../../utils/types";

export const Gift = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const encodedHabit = searchParams.get("habito");

    if (encodedHabit) {
      const decodedHabit = base64UrlDecode(encodedHabit);
      const storedHabits: Habit[] = JSON.parse(
        localStorage.getItem("habits") ?? "[]"
      );

      const habitExists = storedHabits.some(
        (habit) => habit.type === decodedHabit.type
      );

      if (!habitExists) {
        decodedHabit.rewards = rewardBase64UrlEncode(decodedHabit.rewards);
        storedHabits.push(decodedHabit);
        localStorage.setItem("habits", JSON.stringify(storedHabits));
      }

      navigate(`/habitos/${decodedHabit.isNewHabit ? decodedHabit.id : ""}`);
    }
  }, [navigate, searchParams]);

  return <h1>Obteniendo regalo</h1>;
};
