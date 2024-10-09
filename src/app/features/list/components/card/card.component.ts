import { Component, computed, EventEmitter, Input, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../shared/Interfaces/product.interface';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-card',
  standalone: true,
  imports:  [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  
  @Input() product!: Product;
  
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() toggle = new EventEmitter()

  productTitle(): string {
    return this.product.title;
  }
  
  
  onEdit(){
    this.edit.emit()
  }
  onDelete() {
    this.delete.emit();
  }

  toggleComprado() {
    this.product.comp = !this.product.comp;
    this.toggle.emit();
  }
}
