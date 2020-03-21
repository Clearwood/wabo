import {User} from './user';
import {Entity} from './entity';

export interface Consumer extends Entity {
  user?: User;
}
