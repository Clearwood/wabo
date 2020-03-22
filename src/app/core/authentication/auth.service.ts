import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../shared/services/user.service';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user';

type Token = string;

@Injectable()

export class AuthService {
  private authToken: BehaviorSubject<Token>;

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.authToken = new BehaviorSubject<Token>(localStorage.getItem('token'));
  }

  public get tokenValue(): Token {
    return this.authToken.value;
  }

  public login(email: string, password: string) {
    const body = {email, password};
    return this.http.post<{token: string, user: User}>(`${environment.apiUrl}/users/token`, body)
      .pipe(tap((resp: {token: string, user: User}) => {
          localStorage.setItem('user', JSON.stringify(resp.user));
          localStorage.setItem('token', resp.token);
          this.userService.currentUserValue = resp.user;
        })
      );
  }
}
