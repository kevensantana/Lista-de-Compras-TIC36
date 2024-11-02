import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/Interfaces/product.interface';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  productsService = inject(ProductsService)
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
 
  product: Product = inject(ActivatedRoute).snapshot.data['product'];


  onSubmit(product: Product) {
    // Mantenha as propriedades do produto original, exceto o que está sendo editado
    const productWithUserId = { ...product, userId: this.product.userId, id: this.product.id }; // Adicionando id e userId
    this.productsService.putProduct(this.product.id, productWithUserId).subscribe(() => {
      this.matSnackBar.open('Produto editado com sucesso', 'ok');
      this.router.navigateByUrl('/listaCompras');
    });
  }  
}
