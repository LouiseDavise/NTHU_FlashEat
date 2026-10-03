export type HabitIcon = 'brush' | 'body' | 'book' | 'water' | 'leaf' | 'moon' | 'barbell' | 'musical-notes';

export interface Habit {
  id: string;
  name: string;
  icon: HabitIcon;
  /** Local dates (YYYY-MM-DD) the habit was fired. */
  done: string[];
}
