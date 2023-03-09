import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
// import { ordersRoutes } from './lib.routes';
import {BadgeModule} from 'primeng/badge';

import { CartIconComponent } from './componensts/cart-icon/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartService } from './services/cart.service';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './componensts/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import {DropdownModule} from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ThankYouPageComponent } from './pages/thank-you-page/thank-you-page.component';

const routes: Routes=[
  {
    path:'cart',component: CartPageComponent
  },
  {
    path: 'checkout',component: CheckoutPageComponent
  },
  {
    path:'success', component: ThankYouPageComponent
  }
]

@NgModule({
    imports: [CommonModule, 
      RouterModule,BadgeModule,
      RouterModule.forChild(routes),ButtonModule,
      InputNumberModule, FormsModule, ReactiveFormsModule,
      DropdownModule,
      InputTextModule,
      InputMaskModule],
      
      
    declarations: [
      CartIconComponent,
      CartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
      ThankYouPageComponent,
     
    ],
    exports: [
      CartIconComponent,
      CartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
      ThankYouPageComponent,
      
    ]
})
export class OrdersModule {

    constructor(private cartService: CartService){
        cartService.initCartStorage();
        // console.log('Hi');
    }


}
