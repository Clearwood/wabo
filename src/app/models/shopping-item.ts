import { Entity } from './entity';

export interface ShoppingItem extends Entity {
    shoppingList_id?: string;
    productId?: string;
    quantity?: number;
}
