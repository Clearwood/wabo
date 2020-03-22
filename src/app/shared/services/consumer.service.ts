import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Consumer} from 'src/app/models/consumer';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable()
export class ConsumerService {

  private consumer: BehaviorSubject<Consumer> = new BehaviorSubject<Consumer>(null);

  constructor(private http: HttpClient,
              private userService: UserService
  ) {
    this.userService.currentUserSubject.subscribe(user => {
      const params = new HttpParams().set('user_id', user.id);
      this.getAllConsumers(params).subscribe(consumers => {
        if (consumers.length) {
          this.consumer.next(consumers[0]);
        }
      });
    });
  }

  private dataApiEndpoint = environment.apiUrl + '/consumers';

  public get currentConsumerSubject(): BehaviorSubject<Consumer> {
    return this.consumer;
  }

  public get currentConsumer(): Consumer {
    return this.consumer.value;
  }

  public set currentConsumer(consumer: Consumer) {
    this.consumer.next(consumer) ;
  }

  public getConsumerById(consumerId: string): Observable<Consumer> {
    return this.http.get<Consumer>(this.dataApiEndpoint + '/' + consumerId);
  }

  public createConsumer(consumer: {user_id: string}): Observable<Consumer> {
    return this.http.post<Consumer>(this.dataApiEndpoint, consumer);
  }

  public updateConsumer(consumer: Consumer): Observable<Consumer> {
    return this.http.put<Consumer>(this.dataApiEndpoint + '/' + consumer.id, consumer);
  }

  public deleteConsumer(consumerId: string): Observable<Consumer> {
    return this.http.delete<Consumer>(this.dataApiEndpoint + '/' + consumerId);
  }

  public getAllConsumers(params?: HttpParams): Observable<Consumer[]> {
    return this.http.get<Consumer[]>(this.dataApiEndpoint, {params});
  }
}
