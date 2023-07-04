import create from 'zustand';

import { StaffValues } from '@/features/staff';

type StaffDTO = {
  type: string;
  staff_id: string;
  data: StaffValues;
  image_source: string;
};

type useStaffStoreType = {
  type: string;
  isOpen: boolean;
  staff_id: string;
  data: StaffValues;
  image_source: string;
  onOpen: () => void;
  onClose: () => void;
  setType: ({ type, data, staff_id, image_source }: StaffDTO) => void;
  setImageSource: (url: string) => void;
};

export const useStaffStore = create<useStaffStoreType>((set) => ({
  type: '',
  isOpen: false,
  data: {} as StaffValues,
  image_source: '',
  staff_id: '',
  onOpen: () =>
    set(() => ({
      isOpen: true,
    })),
  onClose: () => set(() => ({ isOpen: false })),
  setType: ({ type, data, staff_id, image_source }: StaffDTO) =>
    set(() => ({ type, data, staff_id, image_source })),
  setImageSource: (url: string) => set(() => ({ image_source: url })),
}));
