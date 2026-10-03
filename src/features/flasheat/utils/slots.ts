import { SLOT_MAX, SLOT_TIMES, slotKey } from '@/features/flasheat/data/seed';
import type { SlotBookings } from '@/features/flasheat/types/flasheat';

export function slotsLeft(bookings: SlotBookings, stallId: string, time: string): number {
  return Math.max(0, SLOT_MAX - (bookings[slotKey(stallId, time)] ?? 0));
}

export function nextAvailableSlot(bookings: SlotBookings, stallId: string, afterTime: string): string | null {
  const start = SLOT_TIMES.indexOf(afterTime as (typeof SLOT_TIMES)[number]);
  const found = SLOT_TIMES.slice(start + 1).find((t) => slotsLeft(bookings, stallId, t) > 0);
  if (found) return found;
  return SLOT_TIMES.find((t) => slotsLeft(bookings, stallId, t) > 0) ?? null;
}

export function allSlotsFull(bookings: SlotBookings, stallId: string): boolean {
  return SLOT_TIMES.every((t) => slotsLeft(bookings, stallId, t) === 0);
}
