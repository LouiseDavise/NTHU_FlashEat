import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { buildSeedBookings, buildSeedOrders, slotKey } from '@/features/flasheat/data/seed';
import type { FlashEatState, Order, PickupResult, Session } from '@/features/flasheat/types/flasheat';
import { zustandStorage } from '@/lib/storage';

const SHELF_SPOTS = [
  ...Array.from({ length: 8 }, (_, i) => `A-${i + 1}`),
  ...Array.from({ length: 8 }, (_, i) => `B-${i + 1}`),
];

function freshSession(language: Session['language']): Session {
  return { role: null, customer: null, tenantStallId: null, language };
}

function randomDigits(): string {
  return String(1000 + Math.floor(Math.random() * 9000));
}

function nextFreeSpot(orders: Order[], stallId: string): string {
  const taken = new Set(orders.filter((o) => o.stallId === stallId && o.status === 'Ready').map((o) => o.shelfSpot));
  return SHELF_SPOTS.find((s) => !taken.has(s)) ?? 'B-8';
}

export const useFlashEatStore = create<FlashEatState>()(
  persist(
    (set, get) => ({
      session: freshSession('en'),
      orders: buildSeedOrders(),
      bookings: buildSeedBookings(),

      setLanguage: (language) => set((s) => ({ session: { ...s.session, language } })),

      loginCustomer: (customer) =>
        set((s) => ({ session: { ...s.session, role: 'customer', customer, tenantStallId: null } })),

      loginTenant: (stallId) =>
        set((s) => ({ session: { ...s.session, role: 'tenant', tenantStallId: stallId, customer: null } })),

      switchRole: () =>
        set((s) => ({ session: { ...s.session, role: null, customer: null, tenantStallId: null } })),

      placeOrder: (input) => {
        const { orders, session, bookings } = get();
        let code = randomDigits();
        while (orders.some((o) => o.pickupCode === code)) code = randomDigits();
        let id = `ORD-${randomDigits()}`;
        while (orders.some((o) => o.id === id)) id = `ORD-${randomDigits()}`;
        const customer = session.customer ?? { type: 'Guest' as const, name: 'Guest' };
        const order: Order = {
          id,
          pickupCode: code,
          stallId: input.stallId,
          items: input.items,
          total: input.total,
          slotTime: input.slotTime,
          customerType: customer.type,
          customerName: customer.name,
          status: 'Confirmed',
          shelfSpot: null,
          note: input.note.trim(),
          createdAt: Date.now(),
        };
        const key = slotKey(input.stallId, input.slotTime);
        set({ orders: [...orders, order], bookings: { ...bookings, [key]: (bookings[key] ?? 0) + 1 } });
        return order;
      },

      advanceOrder: (orderId) =>
        set((s) => ({
          orders: s.orders.map((o) => {
            if (o.id !== orderId) return o;
            if (o.status === 'Confirmed') return { ...o, status: 'Preparing' };
            if (o.status === 'Preparing') return { ...o, status: 'Ready', shelfSpot: nextFreeSpot(s.orders, o.stallId) };
            return o;
          }),
        })),

      verifyPickup: (stallId, code): PickupResult => {
        const order = get().orders.find((o) => o.pickupCode === code && o.stallId === stallId);
        if (!order) return { kind: 'invalid' };
        if (order.status === 'PickedUp') return { kind: 'already', order };
        if (order.status !== 'Ready') return { kind: 'notReady', order };
        const done: Order = { ...order, status: 'PickedUp' };
        set((s) => ({ orders: s.orders.map((o) => (o.id === order.id ? done : o)) }));
        return { kind: 'verified', order: done };
      },

      resetDemo: () =>
        set((s) => ({
          session: freshSession(s.session.language),
          orders: buildSeedOrders(),
          bookings: buildSeedBookings(),
        })),
    }),
    {
      name: 'flasheat',
      version: 1,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (s) => ({ session: s.session, orders: s.orders, bookings: s.bookings }),
    },
  ),
);
