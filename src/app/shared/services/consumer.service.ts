import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Consumer} from 'src/app/models/consumer';
import {Observable} from 'rxjs';

@Injectable()
export class ConsumerService {

  private consumer: Consumer;

  constructor(private http: HttpClient,
  ) {
  }

  private dataApiEndpoint = environment.apiUrl + '/consumers';

  public get currentConsumer(): Consumer {
    return this.consumer;
  }

  public set currentConsumer(consumer: Consumer) {
    this.consumer = consumer;
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
