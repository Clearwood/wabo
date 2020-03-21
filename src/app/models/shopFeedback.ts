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

export interface ShopFeedback {
    id?: string;

    shopId?: string;
    supplierId?: string;

    amountOfCostumers?: AmountOfCostumers;
    productAvailability?: ProductAvailability;
}