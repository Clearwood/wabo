import {Entity} from './entity';

export enum JobStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
}

export interface Job  extends Entity {
  status?: JobStatus;
  supplier_id?: string;
  consumer_id?: string;
  shop_id?: string;
  receipt?: string;
  moneyForShop?: number;
  moneyForSupplier?: number;
  deliveryTime?: Date;
  acceptedJobTime?: Date;
}
