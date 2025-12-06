import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private jsonUrl = "assets/product.json";
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
  getProductById(id: number): Observable<any> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
      map(products => products.find(p => p.id == id))
    );
  }

}
