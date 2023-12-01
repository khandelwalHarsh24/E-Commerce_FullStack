import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './component/product-search/product-search.component';
import { CategoriesBannerComponent } from './component/categories-banner/categories-banner.component';
import {  RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './component/product-item/product-item.component';
import { FeaturedProductComponent } from './component/featured-product/featured-product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

import {UiModule} from '@org/ui';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import {MessageModule} from 'primeng/message';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';


const routes: Routes=[
  {
    path:'products',component: ProductListComponent
  },
  {
    path:'category/:categoryId', component: ProductListComponent
  },
  {
    path: 'products/:productId', component: ProductDetailComponent
  }
]

@NgModule({
    imports: [CommonModule,
      HttpClientModule,
      RouterModule.forChild(routes),
      ButtonModule,
      CheckboxModule,
      RatingModule,
      InputNumberModule,
    FormsModule,
    UiModule,
    ToastModule],
    declarations: [
      ProductSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductComponent,
      ProductListComponent,
      ProductDetailComponent
    ],
    providers: [MessageModule,MessageService],
    exports: [ProductSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductComponent, ProductListComponent, ProductDetailComponent]
})
export class ProductsModule {}
