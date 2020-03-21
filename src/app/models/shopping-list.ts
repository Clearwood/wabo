import {Entity} from './entity';

export interface ShoppingList extends Entity {
  consumerId?: string;
  preferCheapProducts?: boolean;
  budget?: string;
}
