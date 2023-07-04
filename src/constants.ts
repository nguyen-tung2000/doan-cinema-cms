export const ROUTES = {
  AUTH: '/auth/*',
  DASHBOARD: '/app/dashboard',
  CINEMA_LIST: '/app/cinema/list',
  CINEMA_DETAIL: '/app/cinema/list/:id',
  CUSTOMERS: '/app/customers',
  MOVIE: '/app/managemovie',
  REVENUE: '/app/revenue',
  ROOM_LIST: '/app/room/listRoom',
  SHOWTIMES_CREATE: '/app/showtimes',
  SELLER: '/app/seller',
  PAYMENT_COMPLETE: '/app/seller/paymentComplete',
  SELLER_TICKETid: '/app/seller/bookTicket/:id',
  FOODS: '/app/foods',
  STAFF: '/app/users',
};

export const SITE_MODAL_TYPES = Object.freeze({
  MEMBER_FORM: 'memberForm',
  BONUS_FORM: 'bonusForm',
  COUPON_FORM: 'couponForm',
});

export const FOOD_FORM = Object.freeze({
  ADD: 'FOOD_FORM_ADD',
  EDIT: 'FOOD_FORM_EDIT',
});

export const STAFF_FORM = Object.freeze({
  ADD: 'STAFF_FORM_ADD',
  EDIT: 'STAFF_FORM_EDIT',
});

export const CUSTOMER_FORM = Object.freeze({
  ADD: 'CUSTOMER_FORM_ADD',
  EDIT: 'CUSTOMER_FORM_EDIT',
});

export const PRICE = {
  CHILD: 45000,
  STUDENT: 50000,
};

export const REVENUE_TYPE = [
  {
    name: 'Tất cả',
    id: 'Full',
  },
  {
    name: 'Phim',
    id: 'Movie',
  },
  {
    name: 'Phòng',
    id: 'Room',
  },
  {
    name: 'Suất chiếu',
    id: 'Time',
  },
];
