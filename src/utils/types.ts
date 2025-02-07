export type Reward = {
  id: number;
  days: number;
  title: string;
  description: string;
  emoji: string;
};

export type Habit = {
  id: string;
  type: string;
  emoji: string;
  iteration: number;
  rewards: Reward[];
  isNewHabit: boolean;
};
