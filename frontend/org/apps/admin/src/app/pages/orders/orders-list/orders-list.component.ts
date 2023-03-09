import { Component } from '@angular/core';
import {Order, OrdersService} from '@org/orders';
import {OnInit} from  '@angular/core'
import { Router } from '@angular/router';



const Order_Status={
  0:{
    label: 'Pending',
    color: 'Primary'
  },
  1:{
    label: 'Processed',
    color: 'warning'
  },
  2:{
    label: 'Shipped',
    color: 'warning'
  },
  3:{
    label: 'Delieverd',
    color: 'Success'
  },
  4:{
    label: 'Failed',
    color: 'danger'
  }
}
@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit{


  orderstatus= Order_Status;
  orders: Order[]=[];

  orderItem=[];

  constructor(private orderService: OrdersService,private router:Router){}
  
  ngOnInit(): void {
      this._getOrders();
  }

  _getOrders(){
    this.orderService.getOrders().subscribe(order=>{
      this.orders=order;
    })
  }

  showOrder(orderId){
    this.router.navigateByUrl(`orders/${orderId}`);
  }
  

}
