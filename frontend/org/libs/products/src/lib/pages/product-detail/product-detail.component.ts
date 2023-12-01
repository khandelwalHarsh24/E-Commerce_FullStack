import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem, CartService } from '@org/orders';
import { MessageService } from 'primeng/api';
import { Product } from '../../model/products';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'products-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})
export class ProductDetailComponent implements OnInit{

  constructor(private productService: ProductService,private route:ActivatedRoute,private cartService: CartService,
    private msg: MessageService,private router: Router){}
  product!: Product;
  quantity=1;

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      if(params['productId']){
        this._getSingleProduct(params['productId']);
      }
    })
  }

  private _getSingleProduct(productId:string){
    
    this.productService.getproduct(productId).subscribe(getProduct=>{
      this.product=getProduct;
    })
  }

  addToCart(){
    const cartItem: CartItem={
      productId: this.product.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem);
    this.msg.add({severity:'info', summary:'Success', detail:`Cart is Updated`}); 
    // setInterval(()=>{
    //   this.router.navigate(['/']);
    // },2000)
  }

}
