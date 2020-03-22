import { Entity } from './entity';

export enum AmountOfCostumers {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export enum ProductAvailability {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export interface ShopFeedback extends Entity {
    shop_id?: string;
    supplier_id?: string;
    amountOfCostumers?: AmountOfCostumers;
    productAvailability?: ProductAvailability;
    timestamp?: Date;
}
