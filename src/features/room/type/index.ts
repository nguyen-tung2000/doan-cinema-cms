import { CinemaType } from '@/features/cinema';
export interface TimeSlot {
  id: string;
  time: string;
  disabled: boolean;
}
export interface ShowtimeType {
  id: number;
  time: string;
}

export interface TimeslotType {
  id: number;
  slot: string;
}

export interface ShowtimeTimeslotType {
  showtime: ShowtimeType;
  timeslots: TimeslotType[];
}

export interface showtimeTimeSlotByRoomResponse {
  success: boolean;
  message: string;
  values: ShowtimeTimeslotType[];
}

export interface TimSlotRespone {
  success: boolean;
  message: string;
  values: {
    timeSlots: TimeSlot[];
  };
}

export interface ScreenType {
  id: string;
  name: string;
}

export interface ScreenRespone {
  success: boolean;
  message: string;
  values: ScreenType[];
}

export interface Room {
  id: string;
  name: string;
  rows: number;
  seats_per_row: number;
  vip_seat_start: number;
  vip_seat_end: number;
  number_seat_couple: number;
  couple_row: number;
  screen_id: number;
  screen_name: string;
  cinema_id: number;
  cinema_name: string;
}
export interface RoomRespone {
  success: boolean;
  message: string;
  values: Room[];
}

export interface RoomByTRespone {
  success: boolean;
  message: string;
  values: {
    rooms: Room[];
  };
}
