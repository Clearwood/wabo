import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Shop } from 'src/app/models/shop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(
    private http: HttpClient,
  ) { }

  private dataApiEndpoint = environment.apiUrl + '/shops';


  public getShopById(shopId: string): Observable<Shop> {
    return this.http.get<Shop>(`${this.dataApiEndpoint}/${shopId}`);
  }

  public createShop(shop: Shop): Observable<Shop> {
    return this.http.post<Shop>(this.dataApiEndpoint, shop);
  }

  public updateShop(shop: Shop): Observable<Shop> {
    return this.http.put<Shop>(`${this.dataApiEndpoint}/${shop.id}`, shop);
  }

  public deleteShop(shopId: string): Observable<Shop> {
    return this.http.delete<Shop>(`${this.dataApiEndpoint}/${shopId}`);
  }

  public getAllShops(params?: HttpParams): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.dataApiEndpoint, {params});
  }
}
