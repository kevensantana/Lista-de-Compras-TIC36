import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../Interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  HttpClient = inject(HttpClient);


  getAll() {
   return this.HttpClient.get<Product[]>('/api/products')
  }
}
