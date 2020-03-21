import {Entity} from './entity';

export interface ShoppingList extends Entity {
  consumer_id?: string;
  preferCheapProducts?: boolean;
  
  shoppingBagsAmount?: number;
  hasCooledProduct?: boolean;
}
