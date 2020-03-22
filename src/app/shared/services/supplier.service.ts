import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Supplier } from 'src/app/models/supplier';
import { Observable } from 'rxjs';

@Injectable()
export class SupplierService {

  constructor(private http: HttpClient,
  ) {
  }

  private dataApiEndpoint = environment.apiUrl + '/suppliers';

  public getSupplierById(supplierId: string): Observable<Supplier> {
    return this.http.get<Supplier>(this.dataApiEndpoint + '/' + supplierId);
  }

  public createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.dataApiEndpoint, supplier);
  }

  public updateSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(this.dataApiEndpoint + '/' + supplier.id, supplier);
  }

  public deleteSupplier(supplierId: string): Observable<Supplier> {
    return this.http.delete<Supplier>(this.dataApiEndpoint + '/' + supplierId);
  }

  public getAllSuppliers(params?: HttpParams): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.dataApiEndpoint, {params});
  }
}
