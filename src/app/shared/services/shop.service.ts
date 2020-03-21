import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Shop, StoreTypes } from 'src/app/models/shop';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(
    private http: HttpClient,
  ) { }

  private dataApiEndpoint = environment.apiUrl + '/shop';

  private mockShop: Shop = {
    id: "dolor",

    streetName: "Dogstreet",
    houseNumber: "42",
    city: "Berlin",
    postCode: "27182",

    latitude: 0.0,
    longitude: 0.0,

    brand: "WallM",
    name: "Clay",
    type: StoreTypes.SUPERMARKET,
  };

  public getShopById(shopId: string): Observable<Shop> {
    //return this.http.get<Product>(`${this.dataApiEndpoint}/${shopId}`)
    return of(this.mockShop);
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
