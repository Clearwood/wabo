import { Entity } from './entity';

export interface ShopXProduct extends Entity {
    shopId?: string;
    productId?: string;

    isAvailable?: boolean;
}