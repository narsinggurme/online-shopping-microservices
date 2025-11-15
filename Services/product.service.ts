import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private jsonUrl = "assets/product.json";
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
}
