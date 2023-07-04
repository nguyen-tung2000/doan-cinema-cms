import * as R from 'ramda';

import { IRevenueData, IRevenueAllByMonth } from '@/features/revenue';
import { formatNumber } from '@/utils/format';

export const getTotalMovie = (data: IRevenueData[], groupName: string) => {
  const isGroupName = (n: IRevenueData) => n.movie_name === groupName;
  const getTotalEachMovie = (n: IRevenueData) => n.total;

  return R.sum(R.map(getTotalEachMovie, R.filter(isGroupName, data)));
};

export const sortByDate = R.sortBy(R.prop('date'));

const getTotalMovieInRangeDate = (movie_name: string, data: IRevenueData[]) => {
  const lstDate = R.uniq(sortByDate(data).map((d) => d.date));
  return lstDate.map((date) => {
    const isMovieAndDate = (n: IRevenueData) => n.date === date && n.movie_name === movie_name;
    const getTotalEachMovie = (n: IRevenueData) => n.total;

    return R.sum(R.map(getTotalEachMovie, R.filter(isMovieAndDate, data)));
  });
};
const getTotalCinemaInRangeDate = (cinema_name: string, data: IRevenueAllByMonth[]) => {
  const lstDate = R.uniq(sortByDate(data).map((d) => d.date));
  return lstDate.map((date) => {
    const isCinemaAndDate = (n: IRevenueAllByMonth) =>
      n.date === date && n.cinema_name === cinema_name;
    const getTotalEachCinema = (n: IRevenueAllByMonth) => n.total;

    return R.sum(R.map(getTotalEachCinema, R.filter(isCinemaAndDate, data)));
  });
};

export const getSeriesByMonth = (data: IRevenueData[]) => {
  const lstMovie = R.uniq(data.map((d) => d.movie_name));
  return lstMovie.map((movie_name) => ({
    name: movie_name,
    data: getTotalMovieInRangeDate(movie_name, data),
  }));
};

export const getSeriesCinemaByMonth = (data: IRevenueAllByMonth[]) => {
  const lstCinema = R.uniq(data.map((d) => d.cinema_name));
  return lstCinema.map((cinema_name) => ({
    name: cinema_name,
    data: getTotalCinemaInRangeDate(cinema_name, data),
  }));
};

export const mapDataRevenue = (data: IRevenueData[]) => {
  return data.map((revenue) => ({
    ...revenue,
    price: revenue.price,
    totalString: formatNumber(revenue.total),
    promotion: revenue.promotion,
  }));
};

export const mapDataInfo = (data: IRevenueData) => ({
  id: data.bill_id,
  movie_name: data.movie_name,
  created_at: data.created_at,
  price: data.price,
  quantity: data.quantity,
  promotion: data.promotion,
  promotion_type: data.promotion_type,
  room_name: data.room_name,
  screen_name: data.screen_name,
  total: formatNumber(data.total),
  type: data.type,
  date: data.date,
  staff_name: data.staff?.name || '',
  username: data.user?.name || '',
});
