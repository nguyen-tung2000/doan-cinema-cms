import {
  format,
  nextMonday,
  nextSunday,
  previousMonday,
  previousSunday,
  endOfWeek,
  startOfWeek,
  parse,
  eachDayOfInterval,
} from 'date-fns';

export const formatDate = (date: number | Date) => format(date, 'yyyy-MM-dd');

export const getDay = (date: string | Date) => {
  let day;

  switch (new Date(date).getDay()) {
    case 0:
      day = 'Chủ Nhật';
      break;
    case 1:
      day = 'Thứ 2';
      break;
    case 2:
      day = 'Thứ 3';
      break;
    case 3:
      day = 'Thứ 4';
      break;
    case 4:
      day = 'Thứ 5';
      break;
    case 5:
      day = 'Thứ 6';
      break;
    case 6:
      day = 'Thứ 7';
  }
  return day;
};

export const getNextMonday = (date: string) =>
  format(nextMonday(parse(date, 'MM/dd/yyyy', new Date())), 'MM/dd/yyyy');

export const getNextSunday = (date: string) =>
  format(nextSunday(parse(date, 'MM/dd/yyyy', new Date())), 'MM/dd/yyyy');

export const getPrevMonday = (date: string) =>
  format(previousMonday(parse(date, 'MM/dd/yyyy', new Date())), 'MM/dd/yyyy');

export const getPrevSunday = (date: string) =>
  format(previousSunday(parse(date, 'MM/dd/yyyy', new Date())), 'MM/dd/yyyy');

export const getCurrentMonday = () =>
  format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'MM/dd/yyyy');

export const getCurrentSunday = () =>
  format(endOfWeek(new Date(), { weekStartsOn: 1 }), 'MM/dd/yyyy');

interface dataEachDay {
  start: Date | number;
  end: Date | number;
}

export const getEachDayOfInterval = ({ start, end }: dataEachDay) => {
  return eachDayOfInterval({
    start,
    end,
  });
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('vn', { maximumFractionDigits: 3 }).format(num);
};

export const convertToMoney = (num: string) => {
  if (num) {
    return parseFloat(num.replace(/,/g, ''));
  }
  return 0;
};

export function removeAccents(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}
