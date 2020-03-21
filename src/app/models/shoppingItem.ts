import { Entity } from './entity';

export enum Unit {
    PIECES = 'pieces',
    LITER = 'liter',
    KILOGRAM = 'kilogram',
  }

export interface ShoppingItem extends Entity {
    shoppingList_id?: string;

    productId?: string;
    quantity?: number;
    quantityUnit?: Unit;
}
