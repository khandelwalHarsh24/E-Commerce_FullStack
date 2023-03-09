import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, CartService, Order, OrderItem, OrdersService } from '@org/orders';
import { UsersService } from '@org/users';
import * as countriesLib from 'i18n-iso-countries';


declare const require

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})

export class CheckoutPageComponent implements OnInit {

  constructor(private router: Router,private userService: UsersService,
    private formBuilder: FormBuilder,private cartService: CartService,
    private orderService: OrdersService){}

  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[]= [];
  userId: string;
  countries = [];
  
  

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
    // console.log(this.orderItems)
  }


  private _getCountries(){
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries=Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry=>{
      return {
        id: entry[0],
        name: entry[1],
      }
    }); 
    // console.log(this.countries);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm()['street'].value,
      shippingAddress2: this.checkoutForm()['apartment'].value,
      city: this.checkoutForm()['city'].value,
      zip: this.checkoutForm()['zip'].value,
      country: this.checkoutForm()['country'].value,
      phone: this.checkoutForm()['phone'].value,
      status: 0,
      user: '5fa7a9a89683ad002411ce1d',
      dateOrdered: `${Date.now()}`
    };

    this.orderService.createOrder(order).subscribe(
      () => {
        //redirect to thank you page // payment
        this.cartService.emptyCart();
        this.router.navigate(['success']);
      },
      () => {
        //display some message to user
      }
    );
  }

  backtoCart(){
    this.router.navigate(['/cart']);
  }

  checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
