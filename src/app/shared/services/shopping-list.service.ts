import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShoppingList } from 'src/app/models/shopping-list';
import { Observable } from 'rxjs';

@Injectable()
export class ShoppingListService {

  constructor(private http: HttpClient,
  ) {
  }

  private dataApiEndpoint = environment.apiUrl + '/shoppingList';

  public getShoppingListById(shoppingListId: string): Observable<ShoppingList> {
    return this.http.get<ShoppingList>(this.dataApiEndpoint + '/' + shoppingListId);
  }

  public createShoppingList(shoppingList: ShoppingList): Observable<ShoppingList> {
    return this.http.post<ShoppingList>(this.dataApiEndpoint, shoppingList);
  }

  public updateShoppingList(shoppingList: ShoppingList): Observable<ShoppingList> {
    return this.http.put<ShoppingList>(this.dataApiEndpoint + '/' + shoppingList.id, shoppingList);
  }

  public deleteShoppingList(shoppingListId: string): Observable<ShoppingList> {
    return this.http.delete<ShoppingList>(this.dataApiEndpoint + '/' + shoppingListId);
  }

  public getAllShoppingLists(params?: HttpParams): Observable<ShoppingList[]> {
    return this.http.get<ShoppingList[]>(this.dataApiEndpoint, {params});
  }
}
