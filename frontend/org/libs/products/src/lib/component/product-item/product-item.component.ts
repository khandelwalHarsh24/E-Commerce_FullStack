import { Component, Input } from '@angular/core';
import { CartItem, CartService } from '@org/orders';
import { MessageService } from 'primeng/api';
import { Product } from '../../model/products';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent {

  @Input()
  resproduct!: Product;

  constructor(private cartService: CartService,private msg: MessageService){}

  addToCart(){
    const cartItem: CartItem={
      productId: this.resproduct.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem);
    this.msg.add({severity:'info', summary:'Success', detail:`Product ${this.resproduct.name} is Added to Cart`}); 
  }
}
