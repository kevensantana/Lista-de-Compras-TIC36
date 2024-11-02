import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../Interfaces/product.interface';
import { ProductPayload } from '../Interfaces/payload-product.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  [x: string]: any;
  HttpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  // Verifica se o usuário já existe no servidor pelo ID
  checkUserExists(id: string | undefined): Observable<boolean> {
    return this.HttpClient.get<any[]>(`${this.apiUrl}/users?id=${id}`).pipe(
      map(users => users.length > 0) 
    );
  }

  constructor(private http: HttpClient) {}

  // Método para obter todos os produtos do usuário autenticado
  getUserProducts(userId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?userId=${userId}`);
  }

 // Método para alternar o estado de compra do produto
  toggleProductStatus(productId: string, productData: Product): Observable<Product> {
    return this.http.patch<Product>(`/api/products/${productId}`, productData);
  }


  getListaCompras() {
    throw new Error("Method not implemented.");
  }

  getAll(): Observable<Product[]> {
    return this.HttpClient.get<Product[]>(`${this.apiUrl}/products`);
  }

  delete(id: string): Observable<void> {
    return this.HttpClient.delete<void>(`${this.apiUrl}/products/${id}`);
  }
  
  // Produtos
  getAllProducts(): Observable<Product[]> {
    return this.HttpClient.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProduct(id: string): Observable<Product> {
    return this.HttpClient.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  postProduct(product: Product) {
    return this.HttpClient.post(`${this.apiUrl}/products`, product);
  }

  putProduct(id: string, payload: ProductPayload): Observable<any> {
    return this.HttpClient.put<any>(`${this.apiUrl}/products/${id}`, payload);
  }

  deleteProduct(id: string): Observable<any> {
    return this.HttpClient.delete<any>(`${this.apiUrl}/products/${id}`);
  }

  // Usuários
  getAllUsers(): Observable<any[]> {
    return this.HttpClient.get<any[]>(`${this.apiUrl}/users`);
  }

  getUser(id: string): Observable<any> {
    return this.HttpClient.get<any>(`${this.apiUrl}/users/${id}`);
  }

  postUser(profile: any): Observable<any> {
    return this.HttpClient.post<any>(`${this.apiUrl}/users`, profile);
  }

}
