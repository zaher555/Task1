import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productId:number=0
  product!:Product
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute){}
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
      }),
      error:((err)=>{
        console.log(err);
      })
    })
  }
}
