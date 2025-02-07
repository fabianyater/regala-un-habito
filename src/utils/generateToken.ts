import { getLink } from "./getLink";
import { Habit, Reward } from "./types";

const url = getLink();

export const base64UrlEncode = (data: Habit) => {
  const encodeRewards = rewardBase64UrlEncode(data.rewards);

  data.rewards = encodeRewards

  const jsonString = JSON.stringify(data);
  const utf8Bytes = new TextEncoder().encode(jsonString);
  let base64 = "";

  for (const byte of utf8Bytes) {
    base64 += String.fromCharCode(byte);
  }

  base64 = btoa(base64);

  return (
    `${url}/regalo?habito=` +
    base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
  );
};

export const rewardBase64UrlEncode = (data: Reward[]) => {
  return data.map((reward) => ({
    ...reward,
    title: btoa(unescape(encodeURIComponent(reward.title))),
    description: btoa(unescape(encodeURIComponent(reward.description))),
    emoji: btoa(unescape(encodeURIComponent(reward.emoji))),
  }));
};

export const base64UrlDecode = (encoded: string): Habit => {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64 = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );
    const binaryString = atob(paddedBase64);
    const utf8Bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      utf8Bytes[i] = binaryString.charCodeAt(i);
    }

    const jsonString = new TextDecoder().decode(utf8Bytes);
    return JSON.parse(jsonString) as Habit;
  } catch (error) {
    console.error("Error al decodificar el hábito:", error);
    return {} as Habit;
  }
};
