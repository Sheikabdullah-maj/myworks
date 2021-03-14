import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from "src/app/product";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:5001/api/product/';

  constructor(private http: HttpClient) { }
  
  getProductsAutoList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'getProductsForAutoCompleteList');
  }

  //Get the product information by the product id
  getProductById(productCode): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'getProductById?code='+productCode);
  }
  
  insertProduct(product: Product): Observable<any> {
      return this.http.post(`${this.baseUrl}`+'insertProduct', product);
  }
  updateProduct(product: Product): Observable<any> {
      return this.http.post(`${this.baseUrl}`+'updateProduct', product);
  }
  
  getAllProducts(): Observable<any> {
      return this.http.get(`${this.baseUrl}`+'getAllProducts');
    }

  
}
