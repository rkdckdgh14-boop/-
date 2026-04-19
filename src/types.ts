export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  isAdmin?: boolean;
}

export type BookingStatus = '예약완료' | '방문예정' | '완료' | '취소';
export type ServiceType = '일반 청소' | '입주 청소' | '이사 청소' | '정기 청소';
export type PaymentStatus = '현장결제' | '결제완료';

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  address: string;
  serviceType: ServiceType;
  date: string;
  time: string;
  status: BookingStatus;
  notes?: string;
  price?: number;
  paymentStatus?: PaymentStatus;
  createdAt: any;
  updatedAt: any;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  content: string;
  rating: number;
  createdAt: any;
}
