import { ProductsService } from './../../shared/services/products.service';
import { Component, inject, signal } from '@angular/core';
import { Product } from '../../shared/Interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './components/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-list',
  standalone: true,
  imports:[CardComponent, RouterLink, MatButtonModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products =  signal<Product[]>(inject(ActivatedRoute).snapshot.data['products']);
  
  productsService = inject(ProductsService);
  router = inject(Router);

  confirmationDialogService = inject(ConfirmationDialogService)
  
  get produtosNaoComprados() {
    return this.products().filter(product => !product.comp);
  }
  
  get produtosComprados() {
    return this.products().filter(product => product.comp);
  }

  onEdit(product: Product){
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {  
    this.confirmationDialogService.openDialog()
    .pipe(filter((answer) => answer === true))
    .subscribe(() => {
        this.productsService.delete(product.id).subscribe(() => { 
          this.productsService.getAll().subscribe((products) => {
            this.products.set(products);
          });
        });
    });
  }

  onToggle(product: Product) {
    product.comp = !product.comp; 
    this.products.set([...this.products()]); 
  }


  trackById(index: number, product: Product): string {
    return product.id; 
  }
}
