import {Entity} from './entity';

export interface ShoppingItem extends Entity {
  shoppingList_id?: string;
  product_id?: string;
  quantity?: number;
  comment?: string;
}
