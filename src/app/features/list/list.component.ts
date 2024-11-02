import { ProductsService } from './../../shared/services/products.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../shared/Interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'] 
})
export class ListComponent implements OnInit {
  // Define `products` como um sinal para gerenciamento reativo de dados
  products = signal<Product[]>([]);
  
  // Injeta dependências
  auth = inject(AuthService);
  productsService = inject(ProductsService);
  router = inject(Router);
  confirmationDialogService = inject(ConfirmationDialogService);
  console: any;

  ngOnInit(): void {
    // Subscrição para obter o perfil do usuário autenticado
    this.auth.user$.subscribe(profile => {
      const userId = profile?.sub;
      if (userId) {
        // Carrega apenas os produtos pertencentes ao usuário autenticado
        this.productsService.getUserProducts(userId).subscribe({
          next: (products) => {
            this.products.set(products);
          },
          error: (error) => {
            console.error('Erro ao carregar produtos:', error);
          }
        });
      }
    });
  }

  get produtosNaoComprados() {
    return this.products().filter(product => !product.comp);
  }
  
  get produtosComprados() {
    return this.products().filter(product => product.comp);
  }

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {  
    this.confirmationDialogService.openDialog()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.productsService.delete(product.id).subscribe(() => { 
  
          const updatedProducts = this.products().filter(p => p.id !== product.id);
          this.products.set(updatedProducts);
        });
      });
  }

  // Método para alternar o estado de compra do produto
  onToggle(product: Product) {
    const newCompStatus = product.comp; 
    console.log(`Toggling product ID: ${product.id} to status: ${newCompStatus}`);

    const updatedProduct: Product = { ...product, comp: newCompStatus };

    this.productsService.toggleProductStatus(product.id, updatedProduct).subscribe({
      next: (response) => {
        // console.log('Produto atualizado:', response);
      
        const updatedProducts = this.products().map(p =>
          // Preserva todos os atributos
          p.id === product.id ? updatedProduct : p 
        );
        this.products.set(updatedProducts);
      },
      error: (error) => {
        console.error('Erro ao atualizar o produto:', error);
      }
    });
  }

  // TrackBy para otimizar a renderização da lista
  trackById(index: number, product: Product): string {
    return product.id; 
  }
}
