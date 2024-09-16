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


  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:8099/api/products/all');
  }  

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.apiHost + `products/categories`);
  }

  createProduct(product: ProductCreation): Observable<Product> {
    return this.http.post<Product>(environment.apiHost + `products/create`, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(environment.apiHost + `products/update/${id}`, product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(environment.apiHost + `products/delete/${productId}`);
  }
}
