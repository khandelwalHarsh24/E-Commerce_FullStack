/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http'
import { Product } from '../model/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { 

  }

  getProduct(categoryFilter?:string[]): Observable<Product[]>{
    let params=new HttpParams();
    if(categoryFilter){
      params=params.append('categories',categoryFilter.join(','));  
      // console.log(params);
    }
    return this.http.get<Product[]>('http://localhost:3000/api/v1/products',{params:params});
  }

  getproduct(productId: string): Observable<Product>{
    return this.http.get<Product>(`http://localhost:3000/api/v1/products/${productId}`);
    // waiting for backend to response and observering the data untill it come 
  }

  createProduct(formData:FormData): Observable<Product>{
    return this.http.post<Product>('http://localhost:3000/api/v1/products/',formData);
  }
  
  deleteProduct(productId:string): Observable<Object>{
    return this.http.delete<Object>(`http://localhost:3000/api/v1/products/${productId}`)
  }

  updateProduct(formData:FormData,productId:string): Observable<Product>{
    return this.http.put<Product>(`http://localhost:3000/api/v1/products/${productId}`,formData);
  }

  getCount(): Observable<Product>{
    return this.http.get<Product>('http://localhost:3000/api/v1/products/get/count')
  }

  getFeaturedProduct(count:number): Observable<Product[]>{
    return this.http.get<Product[]>(`http://localhost:3000/api/v1/products/get/featured/${count}`);
  }
}
