export enum Tags {
    BIO = 'bio',
    VEGETARIAN = 'veggie',
    VEGAN = 'vegan',
}

export interface Product {
    id?: string;
    name?: string;
    tags?: Tags[];
}