import { createContext, useCallback, useMemo, useState } from "react";
import { Reward } from "../utils/types";

type AuthContextProps = {
  rewards: Reward[];
  addReward: (reward: Reward) => void;
  deleteReward: (reward: Reward) => void;
};

export const RewardContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface RewardProviderProps {
  children: React.ReactNode;
}

export const RewardProvider = ({ children }: RewardProviderProps) => {
  const [rewards, setRewards] = useState<Reward[]>([]);

  const addReward = useCallback((reward: Reward) => {
    setRewards((prev) => [...prev, reward]);
  }, []);

  const deleteReward = useCallback((reward: Reward) => {
    console.log("sfsf");
    
    setRewards((prev) => prev.filter((r) => r.id !== reward.id));
  }, []);

  const values = useMemo(
    () => ({
      rewards,
      addReward,
      deleteReward,
    }),
    [addReward, rewards, deleteReward]
  );

  return (
    <RewardContext.Provider value={values}>{children}</RewardContext.Provider>
  );
};
