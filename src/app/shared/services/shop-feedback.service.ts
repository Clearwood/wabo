import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShopFeedback, AmountOfCostumers, ProductAvailability } from 'src/app/models/shop-feedback';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopFeedbackService {
  constructor(
    private http: HttpClient,
  ) { }

  private dataApiEndpoint = environment.apiUrl + '/shopXProduct';

  private mockFeedback: ShopFeedback = {
    id: "YSNP",

    shopId: "dolor",
    supplierId: "idk",

    amountOfCostumers: AmountOfCostumers.HIGH,
    productAvailability: ProductAvailability.LOW,
  };

  public getShopFeedbackId(shopFeedbackId: string): Observable<ShopFeedback> {
    //return this.http.get<Product>(`${this.dataApiEndpoint}/${shopFeedbackId}`)
    return of(this.mockFeedback);
  }

  public createShopFeedback(shopFeedback: ShopFeedback): Observable<ShopFeedback> {
    return this.http.post<ShopFeedback>(this.dataApiEndpoint, shopFeedback);
  }

  public updateShopFeedback(shopFeedback: ShopFeedback): Observable<ShopFeedback> {
    return this.http.put<ShopFeedback>(`${this.dataApiEndpoint}/${shopFeedback.id}`, shopFeedback);
  }

  public deleteShopFeedback(shopFeedback: string): Observable<ShopFeedback> {
    return this.http.delete<ShopFeedback>(`${this.dataApiEndpoint}/${shopFeedback}`);
  }

  public getAllShopFeedbacks(params?: HttpParams): Observable<ShopFeedback[]> {
    return this.http.get<ShopFeedback[]>(this.dataApiEndpoint, {params});
  }
}
