import { Entity } from './entity';

export interface ShopXProduct extends Entity {
    shop_id?: string;
    product_id?: string;

    isAvailable?: boolean;
}
