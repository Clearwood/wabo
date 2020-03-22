import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShoppingItem} from 'src/app/models/shopping-item';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingItemService {
  constructor(
    private http: HttpClient,
  ) { }

  private dataApiEndpoint = environment.apiUrl + '/shopping-items';

  public getShoppingItemById(shoppingItemId: string): Observable<ShoppingItem> {
    return this.http.get<ShoppingItem>(`${this.dataApiEndpoint}/${shoppingItemId}`);
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
