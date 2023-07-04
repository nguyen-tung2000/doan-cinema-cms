import { CouponResponse } from '..';

import { axios } from '@/lib/axios';

interface CouponDTO {
  code: string;
  userId: string;
}

export const getCouponGift = ({ code, userId }: CouponDTO): Promise<CouponResponse> => {
  return axios.get(`/coupon/get-gift`, {
    params: { code, userId },
  });
};
