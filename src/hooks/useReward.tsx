import { useContext } from "react";
import { RewardContext } from "../context/RewardProvider";

export const useReward = () => {
  const context = useContext(RewardContext);

  if (!context) {
    throw new Error("useReward must be used within a RewardProvider");
  }

  return context;
};
