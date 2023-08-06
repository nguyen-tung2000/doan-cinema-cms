import { MovieType } from '@/features/manageMovie';
import { ScreenType, Room, TimeSlot } from '@/features/room';
export interface showTime {
  id: string;
  date: string;
  room: Room[];
}
export interface ShowTimesResponse {
  success: boolean;
  message: string;
  showTimes: showTime[];
}

interface FormatMovie {
  id: string;
  screen: ScreenType;
  movie: MovieType;
}

export interface RoomTValue {
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
}

export interface FormatMovieResponse {
  success: boolean;
  message: string;
  values: {
    screenDetails: FormatMovie[];
  };
}

export interface TimeStamp {
  room_id: number;
  slots: number[];
}

export interface ShowTimesListByDayRange {
  date: string;
  movie: string;
  room: string;
  screen: string;
  time: string;
}
export interface ShowTimesListByDayRangeResponse {
  message: string;
  success: boolean;
  showTimes: ShowTimesListByDayRange[];
}

export interface ShowTimesDetail {
  id: string;
  date: string;
  movie: MovieType;
  room: Room;
  timeSlot: TimeSlot;
  showTime: {
    id: string;
    movie: MovieType;
  };
}

export interface screenDetail {
  title: string;
  showTimesDetails: ShowTimesDetail[];
}

export interface ShowTimesListByDate {
  id: string;
  movie: MovieType;
  screen2D: screenDetail;
  screen3D: screenDetail;
  screenIMAX: screenDetail;
  date: string;
}
export interface ShowTimesListByDateResponse {
  message: string;
  success: boolean;
  showTimes: ShowTimesListByDate[];
}

export interface showtimeMovieRoomList {
  room: string;
  lists: {
    day: string;
    showtimes: {
      slot: string;
      movie: {
        id: number;
        name: string;
        image: string;
      };
    }[];
  }[];
}

export interface showtimeMovieRoomListRes {
  success: boolean;
  message: string;
  values: showtimeMovieRoomList[];
}
export interface ShowtimeType {
  id: number;
  time: string;
}
export interface RoomShowtimeType {
  room: RoomTValue;
  slots: {
    id: number;
    slot: string;
  }[];
}

export interface RoomShowtimeRes {
  success: boolean;
  message: string;
  values: RoomShowtimeType[];
}
