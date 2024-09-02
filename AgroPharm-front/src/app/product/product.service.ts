import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Product, ProductCreation } from './model/product.model';
import { Category } from './model/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8099/api/products/all';

  constructor(private http: HttpClient) { }

  /*getProducts(page: number, size: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}&size=${size}`);

    //return this.http.get(environment.apiHost + `products/?page=${page}&size=${size}`);
  }*/

  /*getProducts(page: number, size: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  createProduct(product: ProductCreation): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  updateProduct(id: number, product: ProductCreation): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }*/


  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:8099/api/products/all');

    //return this.http.get<Product[]>(environment.apiHost + `products/all`);
  }  

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.apiHost + `products/categories`);
  }
}
