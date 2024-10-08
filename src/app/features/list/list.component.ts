import { ProductsService } from './../../shared/services/products.service';
import { Component, inject } from '@angular/core';
import { Product } from '../../shared/Interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'; 
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-confimation-dialog',
  template: `
    <h2 mat-dialog-title>Deletar item<h2>
    <mat-dialog-content>
      <p>Tem certeza que deseja deletar esse item?</p>
    </mat-dialog-content> 
    <mat-dialog-actions align="end">
        <button mat-button (click)="onNot()">Não</button>
        <button mat-raised-button color="primary" (click)="onYes()">Sim</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule]
})

export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onNot(){
    this.matDialogRef.close(false)
  }

  onYes(){
    this.matDialogRef.close(true)
  }
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports:[CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products: Product[] = []
  
  productsService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog)


  ngOnInit(){
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }
  
  onEdit(product: Product){
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {  
    this.matDialog.open(ConfirmationDialogComponent)
      .afterClosed()
      .pipe(filter((answer) => answer === true)) //if para indentificar o sim
      .subscribe(() =>{
        this.productsService.delete(product.id)
          .subscribe(() => { 
            this.productsService.getAll().subscribe((products) => {
              this.products = products;
            });
          });
      })
  }
}
