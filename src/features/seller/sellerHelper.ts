import { ComboItem, SeatType, TicketType, IGift } from '@/features/seller';
import { ShowTimesDetail } from '@/features/showtimes';
import { getDay, getEachDayOfInterval } from '@/utils/format';

export const getRangeDate = () => {
  const today = new Date();
  const endDay = today.setDate(today.getDate() + 5);
  const result = getEachDayOfInterval({
    start: new Date(),
    end: endDay,
  });
  return {
    rangeDate: result,
    startDay: new Date(),
    endDay,
  };
};

export const mapToShowtimeDetails = (showtime: ShowTimesDetail) => {
  const { id, date, room, showTime, timeSlot } = showtime;

  return {
    id,
    date: `${getDay(date)}, ${date}`,
    rowNumber: room.rows,
    seatsInRow: room.seats_per_row,
    screenName: room.screen_name,
    roomName: room.name,
    movieName: showTime.movie.name,
    moviePoster: showTime.movie.image,
    movieLimitAge: showTime.movie.age,
    time: timeSlot.slot,
  };
};

export const getOldPrice = (seatRows: TicketType[]) => {
  for (const row of seatRows) {
    const seat = row.nameSeats.find((s) => s.status === 0);
    if (seat) {
      return seat.price;
    }
  }
  return 0;
};

export const getInvoiceTotal = (seats: SeatType[]) =>
  seats.reduce((previousValue, seat) => previousValue + seat.price, 0);

export const getComboTotal = (combos: ComboItem[]) =>
  combos.reduce((sum, crItem) => sum + crItem.price * crItem.quantity, 0);

export const getNameSeats = (seats: SeatType[]) => seats.map((seat) => seat.seatName).join(', ');

export const getNameCombo = (combos: ComboItem[]) =>
  combos.map((combo) => `${combo.name} (${combo.quantity})`).join(', ');

export const getNameGift = (gifts: IGift[]) =>
  gifts.map((gifts) => `${gifts.name} (${gifts.quantity})`).join(', ');

export const getNewPoint = (combos: ComboItem[], seats: SeatType[]) =>
  Math.floor((getInvoiceTotal(seats) + getComboTotal(combos)) / 10000);

export const getDiscount = (gitfs: IGift[], seats: SeatType[]) => {
  const tickets = gitfs.find((g) => g.type === 0);
  let discount = 0;

  if (!seats.length) {
    return 0;
  }

  if (tickets && seats.length < tickets.quantity) {
    return discount;
  }

  if (tickets) {
    for (let i = 0; i < tickets.quantity; i += 1) {
      discount += seats[i].price;
    }
  }

  return discount;
};

export const getDiscountPercent = (gitfs: IGift[]) => {
  const discountPercent = gitfs.find((g) => g.type === 2);
  if (discountPercent) {
    return 1 - discountPercent.discount;
  }
  return 1;
};
