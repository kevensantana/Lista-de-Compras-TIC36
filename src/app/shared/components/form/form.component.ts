import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../Interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  product = input<Product | null>(null);

  form!: FormGroup;

  @Output() done = new EventEmitter<Product>();

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(this.product()?.title ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(1)]
      
      }),
    });
  }

  onSubmit() {
    if (this.form.valid) { 
      const product: Product = this.form.value as Product;
      this.done.emit(product);
    } else {
      this.form.markAllAsTouched(); 
    }
  }
}
