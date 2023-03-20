import create from "zustand";

import { StaffValues } from "@/features/staff";

type StaffDTO = {
  type: string;
  staffId: string;
  data: StaffValues;
  imageSource: string;
};

type useStaffStoreType = {
  type: string;
  isOpen: boolean;
  staffId: string;
  data: StaffValues;
  imageSource: string;
  onOpen: () => void;
  onClose: () => void;
  setType: ({ type, data, staffId, imageSource }: StaffDTO) => void;
  setImageSource: (url: string) => void;
};

export const useStaffStore = create<useStaffStoreType>((set) => ({
  type: "",
  isOpen: false,
  data: {} as StaffValues,
  imageSource: "",
  staffId: "",
  onOpen: () =>
    set(() => ({
      isOpen: true,
    })),
  onClose: () => set(() => ({ isOpen: false })),
  setType: ({ type, data, staffId, imageSource }: StaffDTO) =>
    set(() => ({ type, data, staffId, imageSource })),
  setImageSource: (url: string) => set(() => ({ imageSource: url })),
}));
