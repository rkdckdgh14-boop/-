import { ServiceType } from './types';

export const SERVICE_TYPES: ServiceType[] = [
  '일반 청소',
  '입주 청소',
  '이사 청소',
  '정기 청소'
];

export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

export const APP_COLORS = {
  primary: '#3CB371', // Eco Green
  secondary: '#FFFFFF',
  text: '#333333',
  background: '#F9FAFB'
};

export const SERVICE_PRICES: Record<ServiceType, number> = {
  '일반 청소': 50000,
  '입주 청소': 150000,
  '이사 청소': 180000,
  '정기 청소': 40000
};
