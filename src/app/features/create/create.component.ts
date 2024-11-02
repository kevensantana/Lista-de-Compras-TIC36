import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from './../../shared/services/products.service';
import { Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { Product } from '../../shared/Interfaces/product.interface';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  productsService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  auth = inject(AuthService);

  userId: string | undefined;

  constructor() {
    this.auth.user$.subscribe((profile) => {
      this.userId = profile?.sub;
    });
  }

  onSubmit(product: Product) {
    const productWithUser = { ...product, userId: this.userId, include:false, comp: false};

    this.productsService.postProduct(productWithUser).subscribe(() => {
      this.matSnackBar.open('Produto Criado com sucesso', 'ok');
      this.router.navigateByUrl('/listaCompras');
    });
  }
}
