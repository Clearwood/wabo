import {Entity} from './entity';

export enum HealthStatus {
  QUARANTINE = 'health.quarantine',
  SICK = 'health.sick',
  HEALTHY = 'health.healthy',
}

export interface User extends Entity {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthday?: Date;
  streetName?: string;
  houseNumber?: string;
  city?: string;
  postCode?: number;
  extraAddressInformation?: string;
  healthStatus?: HealthStatus;
  riskGroup?: boolean;
  phoneNumber?: string;
  password?: string;
  emailVerifiedAt?: Date;
}
