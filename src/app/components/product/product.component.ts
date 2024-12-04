import { Component, inject } from '@angular/core';
import { Product } from '../../model/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-product',
  imports: [CommonModule,RouterLink,MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute,private router:Router){}
  products:Product[]=[]
  cancelSubscription!:Subscription
  bar:boolean=false
  durationInSeconds = 5;
  private _snackBar = inject(MatSnackBar);
  _snackBarRef = inject(MatSnackBar);  
  ngOnInit(): void {
    this.allProducts();
  }
  allProducts()
  {
    this.productService.getAllProducts().subscribe({
      next:((response:any)=>{
        console.log(response.data);
        this.products=response.data
      }),
      error:((err)=>{
        console.log('error');
      })
    })
  }
  delteProduct(productId:any)
  {
    // this.productId=Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productService.deleteCategory(productId).subscribe({
      next:((data)=>{
        this.products=this.products.filter((product)=>product.id!=productId);
        console.log(data);
        this.bar!=this.bar
        this._snackBar.open('product deleted successfully', 'Close', {
          duration: this.durationInSeconds * 1000,
        })
      }),
      error:((err)=>{
        window.location.reload();
        this.bar!=this.bar
        this._snackBar.open('product deleted successfully', 'Close', {
          duration: this.durationInSeconds * 1000,
        })
        console.log(err);
      })
    })
  }
  trackById(index: number, product: any): number {
    return product.id; // Return the unique identifier for each user
  }
}
