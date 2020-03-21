import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShoppingItem, Unit } from 'src/app/models/shoppingItem';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingItemService {
  constructor(
    private http: HttpClient,
  ) { }

  private dataApiEndpoint = environment.apiUrl + '/shoppingItem';

  private mockItem: ShoppingItem = {
    id: "ipsum",
    shopingListId: "some_list_id",

    productId: 'lorem',
    quantity: 1,
    quantityUnit: Unit.KILOGRAM,
  };

  public getShoppingItemById(shoppingItemId: string): Observable<ShoppingItem> {
    //return this.http.get<Product>(`${this.dataApiEndpoint}/${shoppingItemId}`)
    return of(this.mockItem);
  }

  public createShoppingItem(shoppingItem: ShoppingItem): Observable<ShoppingItem> {
    return this.http.post<ShoppingItem>(this.dataApiEndpoint, shoppingItem);
  }

  public updateShoppingItem(shoppingItem: ShoppingItem): Observable<ShoppingItem> {
    return this.http.put<ShoppingItem>(`${this.dataApiEndpoint}/${shoppingItem.id}`, shoppingItem);
  }

  public deleteShoppingItem(shoppingItemId: string): Observable<ShoppingItem> {
    return this.http.delete<ShoppingItem>(`${this.dataApiEndpoint}/${shoppingItemId}`);
  }

  public getAllShoppingItem(params?: HttpParams): Observable<ShoppingItem[]> {
    return this.http.get<ShoppingItem[]>(this.dataApiEndpoint, {params});
  }
}
