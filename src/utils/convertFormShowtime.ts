import { RoomShowtimeType, ShowTimesValues } from '@/features/showtimes';

export const ConvertFormShowtime = (roomList: RoomShowtimeType[], showtimeRes: ShowTimesValues) => {
  let result = showtimeRes.showTimes.map((item, index) => {
    if (item.room_id) {
      let slots = item?.slots.map((slot, i) => {
        if (slot) {
          return roomList[index].slots[i].id;
        }
        return false;
      });
      slots = slots.filter((item) => item != false);
      return { room_id: item.room_id, slots };
    }
    return item;
  });
  result = result.filter((item) => item.room_id && item.slots[0]);
  return {
    showtime_id: showtimeRes.showtime_id,
    movie_id: showtimeRes.movie_id,
    showTimes: result,
  };
};
