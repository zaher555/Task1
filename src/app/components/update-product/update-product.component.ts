import { ProductService } from './../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
constructor(private activatedRoute:ActivatedRoute,private productService:ProductService,private router:Router){}
productId:number=0
product!:Product
productForm!:FormGroup
ngOnInit(): void {
  this.getProduct();
}

getProduct()
{
  this.productId=Number(this.activatedRoute.snapshot.paramMap.get('id'));
  this.productService.getProduct(this.productId).subscribe({
    next:((response:any)=>{
      console.log(response.data)
      this.product=response.data
      this.productForm=new FormGroup({
        'name':new FormControl(this.product.name,[Validators.required,Validators.minLength(2)]),
        'description':new FormControl(this.product.description,[Validators.required,Validators.minLength(2)]),
        'price':new FormControl(this.product.price,[Validators.required,Validators.min(2)]),
        'quantity':new FormControl(this.product.quantity,[Validators.required]),
      })
    }),
    error:((err)=>{
      console.log(err);
    })
  })
}
  updateProduct(form:Product)
  {
    this.productId=Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productService.updateProduct(form,this.productId).subscribe({
      next:((data)=>{
        console.log(data);
      }),
      error:((err)=>{
        console.log(err);
        this.router.navigate(['/products'])
      })
    })
  }
}
