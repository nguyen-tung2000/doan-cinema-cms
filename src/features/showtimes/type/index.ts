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

export interface FormatMovieResponse {
  success: boolean;
  message: string;
  values: {
    screenDetails: FormatMovie[];
  };
}

export interface TimeStamp {
  roomId: string;
  times: string[];
  dateStart: string;
  dateEnd: string;
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
