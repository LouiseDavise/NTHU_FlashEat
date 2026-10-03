import type { TranslationKey } from '@/i18n/translations';
import type { OrderStatus } from '@/features/flasheat/types/flasheat';

export const STATUS_STEPS: OrderStatus[] = ['Confirmed', 'Preparing', 'Ready', 'PickedUp'];

export const STATUS_KEY: Record<OrderStatus, TranslationKey> = {
  Confirmed: 'order.confirmed',
  Preparing: 'order.preparing',
  Ready: 'order.ready',
  PickedUp: 'order.pickedUp',
};

export const CUSTOMER_BADGE_KEY = {
  Student: 'tenant.studentBadge',
  Faculty: 'tenant.facultyBadge',
  Guest: 'tenant.guestBadge',
} as const satisfies Record<string, TranslationKey>;
