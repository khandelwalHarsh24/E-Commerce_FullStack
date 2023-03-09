import { Component } from '@angular/core';
import { Order, OrdersService } from '@org/orders';
import {OnInit} from  '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

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
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {

  order:Order;
  selectedStatus:any;

  orderStatus=[];

  constructor(private orderService: OrdersService,private route: ActivatedRoute,
    private messageService: MessageService){}

  ngOnInit(): void {
      this._mapOrderStatus();
      this._getOrder();
  }


  private _mapOrderStatus(){
    this.orderStatus=Object.keys(Order_Status).map(key=>{
      
      return {
        id: key,
        name: Order_Status[key].label
      }
    })
  }

  private _getOrder(){
    this.route.params.subscribe(params=>{
      if(params['id']){
        this.orderService.getOrder(params['id']).subscribe(order=>{
          this.order=order;
          this.selectedStatus=this.order.status;
        })
      }
    })
  }

  onStatusChange(event){
    this.orderService.updateOrder({status:event.value},this.order.id).subscribe(()=>{
      
      this.messageService.add({severity:'success', summary:'Success', detail:`Order is Created`});
    },
    (error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Order is not Created'});
    })
  }
}
