import { Component, OnInit, Output } from '@angular/core';
import { Product } from '../../model/products';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'products-featured-product',
  templateUrl: './featured-product.component.html',
  styles: [
  ]
})
export class FeaturedProductComponent implements OnInit{

  constructor(private productService: ProductService){}
  featuredProducts: Product[]=[];
  ngOnInit(): void {
      this._getFeaturedProducts();
  }

  private _getFeaturedProducts(){
    this.productService.getFeaturedProduct(4).subscribe(product=>{
      this.featuredProducts=product;
    })
  }
}
