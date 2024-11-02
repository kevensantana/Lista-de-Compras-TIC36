import { inject } from "@angular/core";
import { ProductsService } from "../services/products.service";

export const getUsers = () => {
  const productsService = inject(ProductsService);
  return productsService.getAllUsers(); 
};
