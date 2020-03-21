export enum StoreTypes {
    PHARMACY = 'pharmacy',
    SUPERMARKET = 'supermarket',
    DISCOUNTER = 'discounter',
    WHOLEFOOD = "wholefood",
  }

export interface Shop {
    id?: string;

    streetName?: string;
    houseNumber?: string;
    city?: string;
    postCode?: number;

    latitude?: number;
    longitude?: number;

    brand?: string;
    name?: string;
    type?: StoreTypes;
}