import { User } from './user';

export interface Item {
  $key?: string;
  itemCategory: string;
  itemName: string;
  itemCondition: string;
  itemOriginalPrice: string;
  itemOwner?: User;
  itemYearBought: string;
  itemDescription: string;
  itemImageUrl: string;
  itemBrand?: string;
  itemModel?: string,
  createAt?: any
}
