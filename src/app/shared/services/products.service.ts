import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../Interfaces/product.interface';
import { ProductPayload } from '../Interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  HttpClient = inject(HttpClient);

  getAll() {
   return this.HttpClient.get<Product[]>('/api/products')
  }

  get(id: string) {
    return this.HttpClient.get<Product>(`/api/products/${id}`)
  }

  post(payload: ProductPayload) {
   return this.HttpClient.post('/api/products', payload)
  }

  put(id: string, payload: ProductPayload) {
   return this.HttpClient.put(`/api/products/${id}`, payload)
  }

  delete(id: string){
    return this.HttpClient.delete(`/api/products/${id}`);
  }
}
