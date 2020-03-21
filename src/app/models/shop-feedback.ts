import { Entity } from './entity';

export enum AmountOfCostumers {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

export enum ProductAvailability {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

export interface ShopFeedback extends Entity {
    shopId?: string;
    supplierId?: string;

    amountOfCostumers?: AmountOfCostumers;
    productAvailability?: ProductAvailability;
}