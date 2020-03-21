import {User} from './user';
import {Entity} from './entity';

export interface Supplier extends Entity {
  user?: User;
  hasCar?: boolean;
  hasBike?: boolean;
  hasCooler?: boolean;
}
