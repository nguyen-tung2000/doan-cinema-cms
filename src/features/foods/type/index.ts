import { ComboItem } from '@/features/seller';

export interface ComBosResponse {
  success: boolean;
  message: string;
  combos: ComboItem[];
}

export interface IFood {
  _id: string;
  name: string;
  price: string;
  unit: string;
  image: string;
}
