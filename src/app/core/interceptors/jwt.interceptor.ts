import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../authentication/auth.service';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if ((req.method === 'POST' || req.method === 'PUT') && req.body) {
      req = req.clone ({
        setHeaders: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
      });
    }
    if (this.authService.tokenValue) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.tokenValue}`
        }
      });
    }
    return next.handle(req).pipe(map(resp => {
      if (resp instanceof HttpResponse) {
        return resp.clone({ body: resp.body.data });
      }
      return resp;
    }));
  }


}
