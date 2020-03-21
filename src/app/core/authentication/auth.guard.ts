import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../models/user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user: User = this.userService.currentUser;
    if (user) {
      return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
