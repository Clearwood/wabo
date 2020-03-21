export enum Tags {
    BIO = 'bio',
    VEGETARIAN = 'vegi',
    VEGAN = 'vegan',
}

export interface Product {
    id?: string;
    name?: string;
    tags?: Tags[];
}