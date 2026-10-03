import { create } from 'zustand';

import type { OrderLine } from '@/features/flasheat/types/flasheat';

interface CartState {
  stallId: string | null;
  qty: Record<string, number>;
  slotTime: string | null;
  note: string;
  startStall: (stallId: string, lines?: OrderLine[]) => void;
  setQty: (itemId: string, qty: number) => void;
  setSlot: (time: string | null) => void;
  setNote: (note: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
  stallId: null,
  qty: {},
  slotTime: null,
  note: '',
  startStall: (stallId, lines) => {
    if (get().stallId === stallId && !lines) return;
    const qty: Record<string, number> = {};
    lines?.forEach((l) => {
      qty[l.menuItemId] = l.qty;
    });
    set({ stallId, qty, slotTime: null, note: '' });
  },
  setQty: (itemId, qty) => set((s) => ({ qty: { ...s.qty, [itemId]: Math.max(0, Math.min(10, qty)) } })),
  setSlot: (slotTime) => set({ slotTime }),
  setNote: (note) => set({ note }),
  clear: () => set({ stallId: null, qty: {}, slotTime: null, note: '' }),
}));
