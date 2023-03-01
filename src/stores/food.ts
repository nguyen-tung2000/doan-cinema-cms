import create from 'zustand';

import { FOOD_FORM } from '@/constants';
import { IFood } from '@/features/foods';

type useFoodStoreType = {
  type: string;
  isOpen: boolean;
  data: IFood;
  imageSource: string;
  onOpen: (type: string, data?: any) => void;
  onClose: () => void;
  setImageSource: (url: string) => void;
};

const defaultFood = {
  _id: '',
  name: '',
  price: '',
  unit: '',
  image: '',
};

export const useFoodStore = create<useFoodStoreType>((set) => ({
  type: '',
  isOpen: false,
  data: {
    _id: '',
    name: '',
    price: '',
    unit: '',
    image: '',
  },
  imageSource: '',
  onOpen: (type: string, data?: any) =>
    set(() => ({
      isOpen: true,
      type,
      data: type === FOOD_FORM.EDIT ? data : defaultFood,
      imageSource: type === FOOD_FORM.EDIT ? data.image : '',
    })),
  onClose: () => set(() => ({ isOpen: false })),

  setImageSource: (url: string) => set(() => ({ imageSource: url })),
}));
