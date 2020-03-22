import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserService} from '../../shared/services/user.service';
import {BehaviorSubject, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

type Token = string;

@Injectable()

export class AuthService {
  private authToken: BehaviorSubject<Token>;

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.authToken = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('token')));
  }

  public get tokenValue(): Token {
    return this.authToken.value;
  }

  public login(email: string, password: string) {
    const body = {email, password};
    return this.http.post(`${environment.apiUrl}/users/token`, body)
      .pipe(
        switchMap((token: {token}) => {
          localStorage.setItem('token', token.token);
          return this.userService.getUserById(token.token);
        }),
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }
}
