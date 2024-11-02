import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../Interfaces/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Input() userId: string | undefined;

  @Output() done = new EventEmitter<Product>();

  form!: FormGroup;
  productsService: any;
  matSnackBar: any;
  router: any;

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.product?.title || '', {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      comp: new FormControl(this.product?.comp || false),
      comprado: new FormControl(this.product?.comprado || false) 
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const product: Product = { 
        ...this.form.value, 
        userId: this.userId, // Certifique-se de adicionar userId
      };
      this.done.emit(product);
    } else {
      this.form.markAllAsTouched();
    }
  }
  
  
}
