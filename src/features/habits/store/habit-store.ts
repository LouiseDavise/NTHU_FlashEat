import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from '@/lib/storage';
import type { Habit, HabitIcon } from '../types/habit';
import { dateKey, daysAgo } from '../utils/dates';

function seed(id: string, name: string, icon: HabitIcon, offsets: number[]): Habit {
  return { id, name, icon, done: offsets.map((n) => dateKey(daysAgo(n))) };
}

interface HabitState {
  habits: Habit[];
  toggle: (id: string) => void;
  add: (name: string, icon: HabitIcon) => void;
  remove: (id: string) => void;
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set) => ({
      habits: [
        seed('h1', 'Sketch for ten minutes', 'brush', [1, 2, 3, 4, 6, 7, 9]),
        seed('h2', 'Stretch before coffee', 'body', [1, 2, 3, 5, 6, 7, 8, 9, 10, 11]),
        seed('h3', 'Read a chapter', 'book', [1, 3, 4, 5]),
        seed('h4', 'Water the ferns', 'leaf', [2, 5, 8]),
      ],
      toggle: (id) =>
        set((s) => {
          const today = dateKey(new Date());
          return {
            habits: s.habits.map((h) =>
              h.id !== id
                ? h
                : { ...h, done: h.done.includes(today) ? h.done.filter((d) => d !== today) : [...h.done, today] },
            ),
          };
        }),
      add: (name, icon) =>
        set((s) => ({ habits: [...s.habits, { id: `h${Date.now()}`, name, icon, done: [] }] })),
      remove: (id) => set((s) => ({ habits: s.habits.filter((h) => h.id !== id) })),
    }),
    { name: 'kiln-habits', storage: createJSONStorage(() => zustandStorage) },
  ),
);
