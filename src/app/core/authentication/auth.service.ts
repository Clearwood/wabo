import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserService} from '../../shared/services/user.service';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {switchMap} from 'rxjs/operators';

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

  public login(username: string, password: string) {
    const body = new HttpParams().set('username', username).set('password', password);
    return this.http
      .post<Token>(`${environment.apiUrl}/login`, body.toString())
      .pipe(
        switchMap((token: Token) => {
          if (token) {
            localStorage.setItem('token', token);
            return this.userService.getUser();
          }
        })
      );
  }
}
