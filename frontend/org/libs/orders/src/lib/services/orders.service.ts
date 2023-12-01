import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Order } from '../models/orders';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Product } from '@org/products';

@Injectable({
    providedIn: 'root'
})

export class OrdersService{

    constructor(private http: HttpClient) { 

    }
  
    getOrders(): Observable<Order[]>{
      return this.http.get<Order[]>('http://localhost:3000/api/v1/orders');
    
    }
  
    getOrder(orderId: string): Observable<Order>{
      return this.http.get<Order>(`http://localhost:3000/api/v1/orders/${orderId}`);
      
    }
  
    
    // deleteCategory(categoryId:string): Observable<Object>{
    //   return this.http.delete<Object>(`http://localhost:3000/api/v1/category/${categoryId}`)
    // }
  
    createOrder(order: Order): Observable<Order> {
      return this.http.post<Order>('http://localhost:3000/api/v1/orders', order);
    }

    getproduct(productId: string): Observable<Product>{
      return this.http.get<Product>(`http://localhost:3000/api/v1/products/${productId}`);
      // waiting for backend to response and observering the data untill it come 
    }
    
    updateOrder(orderStatus:{status:string},orderId:string): Observable<Order>{
      return this.http.put<Order>(`http://localhost:3000/api/v1/orders/${orderId}`,orderStatus);
    }
  
    getCount(): Observable<number>{
      return this.http.get<number>('http://localhost:3000/api/v1/orders/get/count')
    }

    totalSaleCount(): Observable<number>{
      return this.http.get<number>('http://localhost:3000/api/v1/orders/get/totalSale')
    }
}