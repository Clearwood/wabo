import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShopXProduct } from 'src/app/models/shop-x-product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopXProductsService {
  constructor(
    private http: HttpClient,
  ) { }

  private dataApiEndpoint = environment.apiUrl + '/shopXProduct';

  private mockProduct: ShopXProduct = {
    id: "xkcd",

    shopId: "dolor",
    productId: "lorem",

    isAvailable: false,
  };

  public getShopXProductById(shopXProductId: string): Observable<ShopXProduct> {
    //return this.http.get<Product>(`${this.dataApiEndpoint}/${shopId}`)
    return of(this.mockProduct);
  }

  public createShopXProduct(shopXProduct: ShopXProduct): Observable<ShopXProduct> {
    return this.http.post<ShopXProduct>(this.dataApiEndpoint, shopXProduct);
  }

  public updateShopXProduct(shopXProduct: ShopXProduct): Observable<ShopXProduct> {
    return this.http.put<ShopXProduct>(`${this.dataApiEndpoint}/${shopXProduct.id}`, shopXProduct);
  }

  public deleteShopXProduct(shopXProduct: string): Observable<ShopXProduct> {
    return this.http.delete<ShopXProduct>(`${this.dataApiEndpoint}/${shopXProduct}`);
  }

  public getAllShopXProducts(params?: HttpParams): Observable<ShopXProduct[]> {
    return this.http.get<ShopXProduct[]>(this.dataApiEndpoint, {params});
  }
}
