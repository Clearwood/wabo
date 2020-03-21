import {Entity} from './entity';

export enum JobStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
}

export interface Job  extends Entity {
  status?: JobStatus;
  supplierId?: string;
  consumerId?: string;
  shopId?: string;
  receipt?: string;
  moneyForShop?: number;
  moneyForSupplier?: number;
  deliveryTime?: Date;
  acceptedJobTime?: Date;
}
