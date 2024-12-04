import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  private url='http://127.0.0.1:8000/api';
  getAllProducts():Observable<Product[]>
  {
    return this.http.get<Product[]>(`${this.url}/products`)
  }
  getProduct(id:any):Observable<Product>
  {
    return this.http.get<Product>(`${this.url}/product/${id}`)
  }
  addProduct(newProduct:Product)
  {
    return this.http.post(`${this.url}/product/store`,newProduct)
  }
  updateProduct(newProduct:any,id:number)
  {
    return this.http.put(`${this.url}/product/update/${id}`,newProduct)
  }
  deleteCategory(id:any)
  {
    return this.http.delete(`${this.url}/product/delete/${id}`)
  }
}