import { Entity } from './entity';

export enum Unit {
    PIECES = 'pieces',
    LITER = 'liter',
    KILOGRAM = 'kilogram',
  }

export interface ShoppingItem extends Entity {
    shopingListId?: string;

    productId?: string;
    quantity?: number;
    quantityUnit?: Unit;
}