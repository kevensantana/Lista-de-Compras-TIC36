// CardComponent
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../shared/Interfaces/product.interface';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  
  @Input() product!: Product;
  
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  @Output() toggle = new EventEmitter<Product>(); 

  productTitle(): string {
    return this.product.title;
  }
  
  onEdit(){
    // Passa o produto para edição
    this.edit.emit(this.product); 
  }

  onDelete() {
     // Passa o produto para deletar
    this.delete.emit(this.product);
  }

  toggleComprado() {
    // Inverte o estado de compra
    this.product.comp = !this.product.comp; 
    this.toggle.emit(this.product); 
  }
}
