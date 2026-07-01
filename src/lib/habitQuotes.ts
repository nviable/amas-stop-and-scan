export const HABIT_QUOTES = [
  "\"I don't know yet\" is a complete and honest answer. Uncertainty, properly calibrated, is protective.",
  "You slowed down when the post wanted speed. That is the habit.",
  "A strong emotional reaction to content is a signal to slow down, not speed up.",
  "The goal isn't to win a fake-spotting game — it's to slow down when something wants you to rush.",
  "You did not outsource judgment to a confident machine. That is the habit.",
  "You separated a trusted face from an untrusted offer. That is the habit.",
] as const;

export function pickHabitQuote(): string {
  return HABIT_QUOTES[Math.floor(Math.random() * HABIT_QUOTES.length)];
}
