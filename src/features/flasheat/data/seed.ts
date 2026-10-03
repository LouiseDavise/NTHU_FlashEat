import type { Cafeteria, CustomerType, MenuItem, Order, SlotBookings, Stall } from '@/features/flasheat/types/flasheat';

export const SLOT_TIMES = [
  '12:00', '12:05', '12:10', '12:15', '12:20', '12:25',
  '12:30', '12:35', '12:40', '12:45', '12:50', '12:55',
] as const;
export const SLOT_MAX = 8;
export const DEMO_CLOCK = '11:45';

export const CAFETERIAS: Cafeteria[] = [
  { id: 'xcb', nameEn: 'XiaoChiBu', nameZh: '小吃部', crowdLevel: 'packed', lineWaitMin: 25, heat: [0, 0, 1, 1, 2, 3, 3, 3, 2, 1, 0, 0] },
  { id: 'fyl', nameEn: 'FungYunLou', nameZh: '風雲樓', crowdLevel: 'busy', lineWaitMin: 15, heat: [0, 0, 0, 1, 2, 2, 3, 2, 1, 1, 0, 0] },
  { id: 'shm', nameEn: 'ShuiMu', nameZh: '水木生活中心', crowdLevel: 'busy', lineWaitMin: 12, heat: [0, 0, 1, 1, 1, 2, 3, 2, 1, 0, 0, 0] },
];

export const STALLS: Stall[] = [
  { id: 'golden', cafeteriaId: 'xcb', nameEn: 'Golden Bento', nameZh: '金饌便當', prepTimeMin: 8 },
  { id: 'noodle', cafeteriaId: 'xcb', nameEn: 'Noodle Corner', nameZh: '麵食坊', prepTimeMin: 10 },
  { id: 'sakura', cafeteriaId: 'shm', nameEn: 'Sakura Don', nameZh: '櫻食丼', prepTimeMin: 10 },
  { id: 'waffle', cafeteriaId: 'shm', nameEn: 'Waffle & Tea', nameZh: '鬆餅茶飲', prepTimeMin: 5 },
  { id: 'spring', cafeteriaId: 'fyl', nameEn: 'Spring Roll House', nameZh: '春捲屋', prepTimeMin: 6 },
  { id: 'sea', cafeteriaId: 'fyl', nameEn: 'SEA Kitchen', nameZh: '南洋廚房', prepTimeMin: 12 },
];

export const MENU_ITEMS: MenuItem[] = [
  { id: 'golden-chicken', stallId: 'golden', nameEn: 'Chicken Leg Bento', nameZh: '雞腿便當', price: 95, soldOut: false },
  { id: 'golden-pork', stallId: 'golden', nameEn: 'Pork Chop Bento', nameZh: '排骨便當', price: 90, soldOut: false },
  { id: 'golden-braised', stallId: 'golden', nameEn: 'Braised Pork Rice Set', nameZh: '滷肉飯套餐', price: 75, soldOut: false },
  { id: 'golden-veggie', stallId: 'golden', nameEn: 'Veggie Bento', nameZh: '蔬食便當', price: 80, soldOut: false },
  { id: 'noodle-beef', stallId: 'noodle', nameEn: 'Beef Noodle Soup', nameZh: '牛肉麵', price: 130, soldOut: false },
  { id: 'noodle-dandan', stallId: 'noodle', nameEn: 'Dan Dan Noodles', nameZh: '擔擔麵', price: 85, soldOut: false },
  { id: 'noodle-wonton', stallId: 'noodle', nameEn: 'Wonton Soup', nameZh: '餛飩湯', price: 70, soldOut: false },
  { id: 'sakura-salmon', stallId: 'sakura', nameEn: 'Salmon Don', nameZh: '鮭魚丼', price: 160, soldOut: false },
  { id: 'sakura-teriyaki', stallId: 'sakura', nameEn: 'Teriyaki Chicken Don', nameZh: '照燒雞丼', price: 120, soldOut: false },
  { id: 'sakura-curry', stallId: 'sakura', nameEn: 'Japanese Curry Rice', nameZh: '日式咖哩飯', price: 110, soldOut: true },
  { id: 'waffle-honey', stallId: 'waffle', nameEn: 'Honey Waffle', nameZh: '蜂蜜鬆餅', price: 65, soldOut: false },
  { id: 'waffle-tea', stallId: 'waffle', nameEn: 'Milk Tea', nameZh: '奶茶', price: 50, soldOut: false },
  { id: 'spring-classic', stallId: 'spring', nameEn: 'Classic Spring Roll', nameZh: '春捲', price: 60, soldOut: false },
  { id: 'spring-combo', stallId: 'spring', nameEn: 'Spring Roll Combo', nameZh: '春捲套餐', price: 95, soldOut: false },
  { id: 'sea-nasi', stallId: 'sea', nameEn: 'Nasi Lemak', nameZh: '椰漿飯', price: 120, soldOut: false },
  { id: 'sea-laksa', stallId: 'sea', nameEn: 'Laksa', nameZh: '叻沙', price: 130, soldOut: false },
];

export const PAYMENT_METHODS = ['card', 'applePay', 'taiwanPay', 'linePay', 'googlePay'] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

interface SeedCustomer {
  type: CustomerType;
  name: string;
}

const SEED_CUSTOMERS: SeedCustomer[] = [
  { type: 'Student', name: '111060214' },
  { type: 'Faculty', name: 'Prof. Lin' },
  { type: 'Guest', name: 'Mei Wang' },
  { type: 'Student', name: '110030087' },
  { type: 'Student', name: '112011456' },
  { type: 'Faculty', name: 'Dr. Chou' },
  { type: 'Guest', name: 'Daniel Huang' },
  { type: 'Student', name: '109080331' },
  { type: 'Student', name: '111022905' },
  { type: 'Guest', name: 'Yuki Tanaka' },
];

const SEED_NOTES = ['', '', 'Less rice', '', 'Not spicy', '', '', 'No cilantro', '', ''];

// Deterministic generator so the seed is identical on every reset.
function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function pad4(n: number): string {
  return String(n).padStart(4, '0');
}

export function buildSeedOrders(): Order[] {
  const rng = makeRng(20260115);
  const usedCodes = new Set<string>(['1234']);
  const usedIds = new Set<string>();
  const orders: Order[] = [];
  const statusPlan: Order['status'][] = [
    'Confirmed', 'Confirmed', 'Confirmed', 'Preparing', 'Preparing', 'Ready', 'Ready', 'PickedUp',
  ];
  let created = 1;
  STALLS.forEach((stall, si) => {
    const menu = MENU_ITEMS.filter((m) => m.stallId === stall.id && !m.soldOut);
    const slots = ['12:00', '12:00', '12:05', '12:05', '12:10', '12:15', '12:20', '12:30'];
    const perStallPlan = si % 2 === 0 ? statusPlan : statusPlan.filter((_, i) => i !== 2);
    let shelf = 0;
    perStallPlan.forEach((status, k) => {
      let code = pad4(1000 + Math.floor(rng() * 9000));
      while (usedCodes.has(code)) code = pad4(1000 + Math.floor(rng() * 9000));
      usedCodes.add(code);
      let id = `ORD-${pad4(1000 + Math.floor(rng() * 9000))}`;
      while (usedIds.has(id)) id = `ORD-${pad4(1000 + Math.floor(rng() * 9000))}`;
      usedIds.add(id);
      const a = menu[Math.floor(rng() * menu.length)];
      const b = menu[Math.floor(rng() * menu.length)];
      const items = a.id === b.id || k % 3 === 0 ? [{ menuItemId: a.id, qty: 1 + (k % 2) }] : [{ menuItemId: a.id, qty: 1 }, { menuItemId: b.id, qty: 1 }];
      const total = items.reduce((sum, l) => sum + (MENU_ITEMS.find((m) => m.id === l.menuItemId)?.price ?? 0) * l.qty, 0);
      const customer = SEED_CUSTOMERS[(si * 3 + k) % SEED_CUSTOMERS.length];
      const hasSpot = status === 'Ready';
      if (hasSpot) shelf += 1;
      orders.push({
        id,
        pickupCode: code,
        stallId: stall.id,
        items,
        total,
        slotTime: slots[k % slots.length],
        customerType: customer.type,
        customerName: customer.name,
        status,
        shelfSpot: hasSpot ? `A-${shelf}` : status === 'PickedUp' ? 'A-8' : null,
        note: SEED_NOTES[(si + k) % SEED_NOTES.length],
        createdAt: created++,
      });
    });
  });
  return orders;
}

export function slotKey(stallId: string, time: string): string {
  return `${stallId}|${time}`;
}

export function buildSeedBookings(): SlotBookings {
  const rng = makeRng(77);
  const out: SlotBookings = {};
  STALLS.forEach((stall) => {
    SLOT_TIMES.forEach((time) => {
      if (time === '12:00' || time === '12:05') out[slotKey(stall.id, time)] = SLOT_MAX;
      else if (time === '12:10') out[slotKey(stall.id, time)] = SLOT_MAX - 3;
      else if (time === '12:15') out[slotKey(stall.id, time)] = SLOT_MAX - 1;
      else out[slotKey(stall.id, time)] = Math.floor(rng() * 6);
    });
  });
  return out;
}
