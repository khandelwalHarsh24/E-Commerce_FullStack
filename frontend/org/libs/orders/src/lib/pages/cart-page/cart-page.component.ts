import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {  CartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';

import { OrdersService } from '../../services/orders.service';
@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit{

  constructor(private router: Router,private cartService: CartService,private orderService: OrdersService){}


  cartItemDetails: CartItemDetailed[]=[];
  cartCount=0;
  
  ngOnInit(): void {
      this._getCartDetails();
  }

  private _getCartDetails(){
    this.cartService.cart$.subscribe(resItem=>{
      this.cartItemDetails=[];
      this.cartCount=resItem?.items.length ?? 0;
      resItem.items.forEach(cartItem => {
        
        this.orderService.getproduct(cartItem.productId).subscribe(resProduct=>{
          this.cartItemDetails.push({
            product: resProduct,
            quantity: cartItem.quantity
          })
        })
      });
    })
  }

  backtoShop(){
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemDetailed){
    this.cartService.deleteCartItem(cartItem.product.id)
  }

  updateCartQuantity(event:Event,cartItem: CartItemDetailed){
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event['value']
    },true )
  } 

  // () = output
  // [] = input
}
