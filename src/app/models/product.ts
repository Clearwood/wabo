import { Entity } from './entity';

export enum Tags {
    BIO = 'bio',
    VEGETARIAN = 'veggie',
    VEGAN = 'vegan',
    FROZEN = 'frozen',
}
export enum QuantityUnit {
  PIECES = 'pieces',
  LITER = 'liter',
  KG = 'kilogram'
}

export interface Product extends Entity {
    name?: string;
    tags?: Tags[];
    shopType?: string;
    priceRangeMin?: number;
    priceRangeMax?: number;
    quantityUni?: QuantityUnit;
    needsCooling?: boolean;
}
