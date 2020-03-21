import {Entity} from './entity';

export enum HealthStatus {
  QUARANTINE = 'quarantine',
  SICK = 'sick',
  HEALTHY = 'healthy',
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
