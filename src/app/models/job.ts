import {Entity} from './entity';

export enum JobStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
}

export interface Job extends Entity {
  status?: JobStatus;
  supplierId?: string;
  consumerId?: string;
  shopId?: string;
  receipt?: string;
  paymentForShop?: number;
  paymentForSupplier?: number;
  deliveryTime?: Date;
  acceptedJobTime?: Date;
  shoppingListId?: string;
}
