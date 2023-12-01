import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@org/orders';
import { ProductService } from '@org/products';
import { UsersService } from '@org/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-selector',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit{
  // userStatistics: number;
  // productStatistics: number;
  // orderStatistics: number;
  // totalSaleStats:number;
  statistics=[];
  constructor(private userService: UsersService,private productService: ProductService,private orderService: OrdersService){
  }
  ngOnInit(): void {
    //  this.userService.getCount().subscribe(count=>{
    //    this.userStatistics=count['users'];
    //  })
    //  this.productService.getCount().subscribe(count=>{
    //   this.productStatistics=count['product'];
    //  })
    //  this.orderService.getCount().subscribe(count=>{
    //   this.orderStatistics=count['orderCount'];
    //  })
    //  this.orderService.totalSaleCount().subscribe(count=>{
    //   this.totalSaleStats=count['totalsales'];
    //  })

    combineLatest([
    this.orderService.getCount(),
    this.productService.getCount(),
    this.userService.getCount(),
    this.orderService.totalSaleCount()
  ]).subscribe((values) => {
    this.statistics = values;
    console.log(this.statistics);
  });
     
     
  }

  
}
