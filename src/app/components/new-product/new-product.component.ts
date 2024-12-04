import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, inject } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule,CommonModule,MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  bar:boolean=false
  durationInSeconds = 2;
  private _snackBar = inject(MatSnackBar);
  _snackBarRef = inject(MatSnackBar);  products:Product[]=[]
  constructor(private productService:ProductService,private router:Router){}
  productForm:FormGroup=new FormGroup({
    'name':new FormControl('',[Validators.required,Validators.minLength(2)]),
    'description':new FormControl('',[Validators.required,Validators.minLength(2)]),
    'price':new FormControl('',[Validators.required,Validators.min(2)]),
    'quantity':new FormControl('',[Validators.required]),
  })
  addProduct(form:Product)
  {
    this.productService.addProduct(form).subscribe({
      next:((data)=>{
        // this.router.navigate(['/products']);
        console.log(data);
        this.bar!=this.bar
        this._snackBar.open('Login Successful!', 'Close', {
          duration: this.durationInSeconds * 1000,
        })
      }),
      error:((err)=>{
        console.log(err);
        this.router.navigate(['/products'])
      })
    })
  }
}
