import { CinemaType } from '@/features/cinema';
export interface TimeSlot {
  id: string;
  time: string;
  disabled: boolean;
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
  weekdayPrice: number;
  weekendPrice: number;
}

export interface ScreenRespone {
  success: boolean;
  message: string;
  values: {
    screens: ScreenType[];
  };
}

export interface Room {
  id: string;
  name: string;
  rowNumber: number;
  seatsInRow: number;
  screen: ScreenType;
  cinema: CinemaType;
  timeSlots: TimeSlot[];
}
export interface RoomRespone {
  success: boolean;
  message: string;
  values: {
    rooms: Room[];
  };
}

export interface RoomByTRespone {
  success: boolean;
  message: string;
  values: {
    rooms: Room[];
  };
}
