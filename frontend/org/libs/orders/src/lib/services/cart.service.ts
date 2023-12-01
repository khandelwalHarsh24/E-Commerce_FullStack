import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  // constructor() { }

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  initCartStorage(){
    const cart= this.getCart();
    if(!cart){
      const initialCart={
        items:[]
      }
      const initialJsonCart=JSON.stringify(initialCart);
      localStorage.setItem('cart',initialJsonCart);
    }
    else{
      this.cart$.next(cart);
    }
    
  }


  emptyCart() {
    const intialCart = {
      items: []
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem('cart', intialCartJson);
    this.cart$.next(intialCart);
  }

  getCart(): Cart{
    const cartJsonString: string=localStorage.getItem('cart');
    const cart: Cart=JSON.parse(cartJsonString);
    return cart;
  }

  setCartItem(cartItem?: CartItem,updateCardQuantity?:boolean): Cart{
    const cart= this.getCart();
    const cartItemExist=cart.items.find((item)=> item.productId===cartItem.productId);
    if(cartItemExist){
      cart.items.map(item=>{
        if(item.productId===cartItem.productId){
          if(updateCardQuantity){
            item.quantity=cartItem.quantity
          }
          else{
            item.quantity=item.quantity+cartItem.quantity;
          }
          
          return item; 
        }
      })
    }
    else{
      cart.items.push(cartItem);
    }
    
    const initialJsonCart=JSON.stringify(cart);
    localStorage.setItem('cart',initialJsonCart);
    // cart will update himself
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId:string){
    const cart=this.getCart();
    const newCart=cart.items.filter(item=>item.productId!==productId)
    cart.items=newCart;
    const initialJsonCart=JSON.stringify(cart);
    localStorage.setItem('cart',initialJsonCart);
    this.cart$.next(cart);
    
  }
}
