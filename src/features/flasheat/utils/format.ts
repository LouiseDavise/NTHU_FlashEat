import { MENU_ITEMS } from '@/features/flasheat/data/seed';
import type { OrderLine } from '@/features/flasheat/types/flasheat';

export function cartLines(qty: Record<string, number>): OrderLine[] {
  return Object.entries(qty)
    .filter(([, n]) => n > 0)
    .map(([menuItemId, n]) => ({ menuItemId, qty: n }));
}

export function linesTotal(lines: OrderLine[]): number {
  return lines.reduce((sum, l) => sum + (MENU_ITEMS.find((m) => m.id === l.menuItemId)?.price ?? 0) * l.qty, 0);
}

export function linesCount(lines: OrderLine[]): number {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}

export function estimatedLineWait(cafeteriaWait: number, prepMin: number): number {
  return Math.max(3, Math.round(cafeteriaWait * (0.5 + prepMin / 20)));
}
