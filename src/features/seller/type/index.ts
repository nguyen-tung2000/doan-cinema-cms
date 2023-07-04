import { AuthUser as Staff } from '@/features/auth';
import { ShowTimesDetail } from '@/features/showtimes';

export interface SeatType {
  idSeat: string;
  seatName: string;
  price: number;
  status: 1 | 0;
  showTimeDetail?: string;
  type: number;
}

export interface TicketType {
  nameRow: string;
  nameSeats: SeatType[];
}

export interface TicketResponse {
  success: boolean;
  message: string;
  values: {
    tickets: TicketType[];
    showTimeDetail: ShowTimesDetail;
    combos: ComboItem[];
  };
}

export interface ComboItem {
  id: string;
  name: string;
  quantity: number;
  image: string;
  unit: string;
  price: number;
}

export enum UserType {
  Adult = 'Adult',
  Student = 'Student',
  Member = 'Member',
}

interface IBill {
  createdAt: string;
  paymentType: number;
  total: number;
  user: string;
}

export interface BillsResponse {
  foodBill: {
    bill: IBill;
    data: ComboItem[];
  };
  ticketBill: {
    bill: IBill;
    data: SeatType[];
  };
  time: string;
  movieName: string;
  roomName: string;
  date: string;
  staff?: Staff;
}
export interface BuyTicketResponse {
  success: boolean;
  message: string;
  combos: ComboItem[];
  tickets: SeatType[];
  gifts: IGift[];
  coupons: string[];
  showTimeDetail: ShowTimesDetail;
  bills: BillsResponse;
}

interface UserAddress {
  city: string;
  district: string;
  ward: string;
  street: string;
}

export interface AuthUser {
  id: string;
  email: string;
  createdAt: string;
  phoneNumber: string;
  name: string;
  date_of_birth: string;
  address: UserAddress;
  point: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: AuthUser;
}

export interface IGift {
  id: string;
  name: string;
  image: string;
  point: number;
  type: 1 | 0 | 2;
  screenId: string;
  quantity: number;
  coupon: boolean;
  discount: number;
}

export interface GiftResponse {
  status: boolean;
  message: string;
  values: {
    gifts: IGift[];
  };
}

export interface ICoupon {
  id: string;
  code: string;
  pointTotal: number;
  dateExpiry: string;
  user: string;
  gift: IGift;
  status: number;
}
export interface CouponResponse {
  success: boolean;
  message: string;
  values: {
    coupon: ICoupon;
  };
}
