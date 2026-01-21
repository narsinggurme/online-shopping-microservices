import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../src/app/models/product.model';
import { environment } from '../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.api.baseUrl + environment.api.productService;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-Correlation-ID': uuidv4()
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}?category=${category}`,
      { headers: this.getHeaders() }
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }
}
