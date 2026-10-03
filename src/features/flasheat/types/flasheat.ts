export type Language = 'en' | 'zh';
export type Role = 'customer' | 'tenant';
export type CustomerType = 'Student' | 'Faculty' | 'Guest';
export type CrowdLevel = 'calm' | 'busy' | 'packed';
export type OrderStatus = 'Confirmed' | 'Preparing' | 'Ready' | 'PickedUp';

export interface Cafeteria {
  id: string;
  nameEn: string;
  nameZh: string;
  crowdLevel: CrowdLevel;
  lineWaitMin: number;
  heat: number[];
}

export interface Stall {
  id: string;
  cafeteriaId: string;
  nameEn: string;
  nameZh: string;
  prepTimeMin: number;
}

export interface MenuItem {
  id: string;
  stallId: string;
  nameEn: string;
  nameZh: string;
  price: number;
  soldOut: boolean;
}

export interface OrderLine {
  menuItemId: string;
  qty: number;
}

export interface Order {
  id: string;
  pickupCode: string;
  stallId: string;
  items: OrderLine[];
  total: number;
  slotTime: string;
  customerType: CustomerType;
  customerName: string;
  status: OrderStatus;
  shelfSpot: string | null;
  note: string;
  createdAt: number;
}

export interface Customer {
  type: CustomerType;
  name: string;
}

export interface Session {
  role: Role | null;
  customer: Customer | null;
  tenantStallId: string | null;
  language: Language;
}

export type SlotBookings = Record<string, number>;

export interface PlaceOrderInput {
  stallId: string;
  items: OrderLine[];
  total: number;
  slotTime: string;
  note: string;
}

export type PickupResult =
  | { kind: 'verified'; order: Order }
  | { kind: 'invalid' }
  | { kind: 'notReady'; order: Order }
  | { kind: 'already'; order: Order };

export interface FlashEatState {
  session: Session;
  orders: Order[];
  bookings: SlotBookings;
  setLanguage: (language: Language) => void;
  loginCustomer: (customer: Customer) => void;
  loginTenant: (stallId: string) => void;
  switchRole: () => void;
  placeOrder: (input: PlaceOrderInput) => Order;
  advanceOrder: (orderId: string) => void;
  verifyPickup: (stallId: string, code: string) => PickupResult;
  resetDemo: () => void;
}
