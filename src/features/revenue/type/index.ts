import { Customer, AuthUser } from '@/features/auth';
import { MovieType } from '@/features/manageMovie';
import { Room, TimeSlot } from '@/features/room';

interface BaseEntity {
  success: boolean;
  message: string;
}

export interface IRevenue {
  id: string;
  name: string;
  price: number;
  count: number;
}

export interface IStatistical {
  ticket: {
    adult: IRevenue;
    child: IRevenue;
    student: IRevenue;
    total: number;
    total_promotion: number;
  };
  food: {
    combo: IRevenue[];
    total: number;
    total_promotion: number;
  };
  totalPrice: number;
}

export interface IRevenueWithMovie {
  movie: MovieType;
  statistical: IStatistical;
}

export interface IRevenueWithRoom {
  room: Room;
  statistical: IStatistical;
}

export interface IRevenueWithTime {
  timeSlot: TimeSlot;
  statistical: IStatistical;
}

export interface IRevenueData {
  bill_id: string;
  created_at: string;
  movie_name: string;
  price: string;
  quantity: number;
  promotion: number;
  promotion_type: string;
  room_name: string;
  screen_name: string;
  total: number;
  type: string;
  date: string;
  point: number;
  staff: AuthUser;
  user: Customer;
}

export interface RevenueResponse extends BaseEntity {
  values: {
    data: IRevenueData[];
    total: number;
  };
}

export interface IRevenueAllByMonth {
  date: string;
  cinemaid: string;
  cinema_name: string;
  total: number;
}
export interface RevenueAllByMonthResponse extends BaseEntity {
  data: IRevenueAllByMonth[];
}

export interface RevenueResponseMoive extends BaseEntity {
  data: IRevenueWithMovie[];
}

export interface RevenueResponseRoom extends BaseEntity {
  data: IRevenueWithRoom[];
}

export interface RevenueResponseTime extends BaseEntity {
  data: IRevenueWithTime[];
}

export interface IRevenueByMovie {
  movie: MovieType;
  total_food: number;
  total_ticket: number;
  total_price: number;
}

export interface RevenueResponseByMovie extends BaseEntity {
  data: IRevenueByMovie[];
}
