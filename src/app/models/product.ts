import { Entity } from './entity';

export enum Tags {
    BIO = 'bio',
    VEGETARIAN = 'veggie',
    VEGAN = 'vegan',
}

export interface Product extends Entity {
    name?: string;
    tags?: Tags[];
}