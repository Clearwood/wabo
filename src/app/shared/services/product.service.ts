import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product, Tags } from 'src/app/models/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }

  private dataApiEndpoint = environment.apiUrl + '/product';

  private mockProduct: Product = {
    id: 'lorem',
    name: "milk",
    tags: [Tags.BIO]
  };

  public getProductById(productId: string): Observable<Product> {
    //return this.http.get<Product>(`${this.dataApiEndpoint}/${productId}`)
    return of(this.mockProduct);
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.dataApiEndpoint, product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.dataApiEndpoint}/${product.id}`, product);
  }

  public deleteProduct(productId: string): Observable<Product> {
    return this.http.delete<Product>(`${this.dataApiEndpoint}/${productId}`);
  }

  public getAllProducts(params?: HttpParams): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataApiEndpoint, {params});
  }

}
