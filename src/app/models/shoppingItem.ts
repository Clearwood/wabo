export enum Unit {
    PIECES = 'pieces',
    LITER = 'liter',
    KILOGRAM = 'kilogram',
  }

export interface ShoppingItem{
    id?: string;
    shopingListId?: string;

    productId?: string;
    quantity?: number;
    quantityUnit?: Unit;
}