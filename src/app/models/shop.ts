export enum StoreTypes {
    FARMACY = 'farmacy',
    SUPERMARKET = 'supermarket',
    DISCOUNTER = 'discounter',
    WHOLEFOOD = "wholefood",
  }

export interface Shop {
    id?: string;

    streetName?: string;
    houseNumber?: string;
    city?: string;
    postCode?: string;

    latitude?: number;
    longitude?: number;

    brand?: string;
    name?: string;
    type?: StoreTypes;
}