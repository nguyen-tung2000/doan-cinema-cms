import create from 'zustand';

import { SITE_MODAL_TYPES } from '@/constants';
import {
  AuthUser,
  getUserProfile,
  ComboItem,
  SeatType,
  BillsResponse,
  IGift,
  ICoupon,
  getGiftByScreen,
} from '@/features/seller';

type Keys = keyof typeof SITE_MODAL_TYPES;
export type ModalType = typeof SITE_MODAL_TYPES[Keys];

type SellerStore = {
  openModal: boolean;
  message: string;
  screenId: string;
  modalType: ModalType;
  step: number;
  point: number;
  isLoading: boolean;
  member: AuthUser;
  selectedSeats: SeatType[];
  selectedCombos: ComboItem[];
  selectedGifts: IGift[];
  selectedCoupons: string[];
  bills: BillsResponse;
  gifts: IGift[];
  coupon: ICoupon;
  setSelectedSeats: (seats: SeatType[]) => void;
  setBills: (bills: BillsResponse) => void;
  setSelectedGift: (gift: IGift) => void;
  setModal: (modalType: ModalType) => void;
  setLoading: (loading: boolean) => void;
  clearBill: () => void;
  closeModal: () => void;
  nextStep: () => void;
  previousStep: () => void;
  getScreen: (screenId: string) => void;
  fetchMember: (phoneNumber: string) => Promise<boolean>;
  fetchGifts: (screenId: string) => Promise<boolean>;
  fetchCoupon: (coupon: ICoupon) => void;
  incGift: (gift: IGift) => void;
  desGift: (gift: IGift) => void;
  inc: (item: ComboItem) => void;
  des: (item: ComboItem) => void;
  reset: () => void;
};

export const useSellerStore = create<SellerStore>((set) => ({
  openModal: false,
  modalType: '',
  message: '',
  screenId: '',
  step: 1,
  point: 0,
  isLoading: false,
  member: {} as AuthUser,
  bills: {} as BillsResponse,
  coupon: {} as ICoupon,
  gifts: [],
  selectedCombos: [],
  selectedSeats: [],
  selectedGifts: [],
  selectedCoupons: [],
  setLoading: (loading) => set(() => ({ isLoading: loading })),
  setModal: (modalType) =>
    set(() => ({
      modalType,
      openModal: true,
    })),
  closeModal: () => set(() => ({ openModal: false })),
  nextStep: () =>
    set((state) => ({
      step: state.step > 3 ? 3 : state.step + 1,
    })),
  previousStep: () =>
    set((state) => ({
      step: state.step - 1,
    })),
  getScreen: (screenId) => set(() => ({ screenId })),
  fetchMember: async (phoneNumber: string) => {
    let isSucess = true;
    try {
      set({ isLoading: true });
      const { user, success } = await getUserProfile({ phoneNumber });
      set({ isLoading: false });
      if (!success) {
        isSucess = false;
      } else {
        set({ member: user, point: user.point });
      }
    } catch {
      set({ isLoading: false });
      isSucess = false;
    }

    return isSucess;
  },
  fetchGifts: async (screenId: string) => {
    let isSucess = true;
    try {
      set({ isLoading: true });
      const { values, status } = await getGiftByScreen({ screenId });
      const gifts = values.gifts.filter((g) => g.type !== 2); // hide discount gift
      set({ isLoading: false });

      if (!status) {
        isSucess = false;
      } else {
        set({ gifts: gifts });
      }
    } catch {
      set({ isLoading: false });

      isSucess = false;
    }

    return isSucess;
  },
  fetchCoupon: (coupon: ICoupon) =>
    set((state) => ({
      coupon,
      isLoading: false,
      selectedGifts: [...state.selectedGifts, { ...coupon.gift, quantity: 1, coupon: true }],
      selectedCoupons: [...state.selectedCoupons, coupon.code],
    })),
  setSelectedSeats: (seats: SeatType[]) => set(() => ({ selectedSeats: seats })),
  setBills: (bills: BillsResponse) => set(() => ({ bills })),
  clearBill: () => set(() => ({ bills: {} as BillsResponse })),
  inc: (item: ComboItem) =>
    set((state) => {
      const comboItem = state.selectedCombos.find((combo) => combo._id === item._id);
      if (comboItem) {
        comboItem.quantity++;
        set({ selectedCombos: [...state.selectedCombos] });
      } else {
        set({ selectedCombos: [...state.selectedCombos, { ...item, quantity: 1 }] });
      }
    }),
  des: (item: ComboItem) =>
    set((state) => {
      const comboItem = state.selectedCombos.find((combo) => combo._id === item._id);
      if (comboItem) {
        comboItem.quantity--;
        set({ selectedCombos: [...state.selectedCombos] });

        if (comboItem.quantity === 0) {
          const newSelectedCombos = [...state.selectedCombos].filter((combo) => combo.quantity > 0);
          set({ selectedCombos: newSelectedCombos });
        }
      }
    }),
  setSelectedGift: (gift: IGift) => {
    set((state) => {
      const hasGift = state.selectedGifts.find((g) => g._id === gift._id);
      const hasGiftDiscount = state.selectedGifts.find((g) => g.type === 2);
      const coupon = false;

      if (hasGiftDiscount) {
        return { ...state, message: 'Chỉ dùng được 1 lần coupon giảm giá' };
      }

      if (hasGift) {
        hasGift.quantity++;
        return { ...state, selectedGifts: [...state.selectedGifts] };
      } else {
        return {
          selectedGifts: [...state.selectedGifts, { ...gift, quantity: 1, coupon }],
        };
      }
    });
  },
  incGift: (gift: IGift) =>
    set((state) => {
      const hasGift = state.selectedGifts.find((g) => g._id === gift._id);
      const newPoint = state.point - gift.point;
      const coupon = false;

      if (hasGift) {
        hasGift.quantity++;
        return { ...state, selectedGifts: [...state.selectedGifts], point: newPoint };
      } else {
        return {
          selectedGifts: [...state.selectedGifts, { ...gift, quantity: 1, coupon }],
          point: newPoint,
        };
      }
    }),
  desGift: (gift: IGift) =>
    set((state) => {
      const hasGift = state.selectedGifts.find((g) => g._id === gift._id);
      const newPoint = state.point + gift.point;

      if (hasGift) {
        hasGift.quantity--;
        set({ selectedGifts: [...state.selectedGifts], point: newPoint });

        if (hasGift.quantity === 0) {
          const newSelectedGifts = [...state.selectedGifts].filter((g) => g.quantity > 0);
          set({ selectedGifts: newSelectedGifts, point: newPoint });
        }
      }
    }),
  reset: () =>
    set((state) => ({
      ...state,
      selectedGifts: [],
      selectedSeats: [],
      selectedCombos: [],
      step: 1,
      member: {} as AuthUser,
      point: 0,
    })),
}));
