
export type Role = 'ADMIN' | 'MANAGER' | 'STAFF' | 'ACCOUNTANT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  farmId: string;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  ownerId: string;
}

export interface Flock {
  id: string;
  breed: string;
  startDate: string;
  initialCount: number;
  currentCount: number;
  purpose: 'LAYER' | 'BROILER';
  status: 'ACTIVE' | 'CLOSED';
}

export type ActivityType = 'VACCINATION' | 'DEBEAKING' | 'MEDICATION' | 'CLEANING' | 'GRADING' | 'VACCINATION_BOOSTER';

export interface PoultryActivity {
  id: string;
  flockId: string;
  type: ActivityType;
  date: string;
  product?: string;
  technician: string;
  status: 'SCHEDULED' | 'COMPLETED';
  notes?: string;
}

export interface EggProductionLog {
  id: string;
  flockId: string;
  date: string;
  quantity: number;
  collectedBy: string;
  notes?: string;
}

export interface Pond {
  id: string;
  name: string;
  sizeM2: number;
  stockingDate: string;
  lastWaterChangeDate: string;
  initialCount: number;
  currentCount: number;
  status: 'ACTIVE' | 'HARVESTED';
}

export interface FeedLog {
  id: string;
  date: string;
  quantityKg: number;
  type: string;
  targetId: string; // flockId or pondId
}

export interface MortalityLog {
  id: string;
  date: string;
  count: number;
  cause: string;
  targetId: string;
}

export interface WaterQualityLog {
  id: string;
  date: string;
  temperature: number;
  ph: number;
  dissolvedOxygen: number;
  ammonia: number;
  pondId: string;
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
}

export interface Sale {
  id: string;
  date: string;
  product: string;
  quantity: number;
  amount: number;
}

export interface Alert {
  id: string;
  severity: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}
