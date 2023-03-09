import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../model/category';
import { Product } from '../../model/products';
import { CategoriesService } from '../../services/categories.service';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'products-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit {

  products: Product[]=[];
  categories: Category[]=[];
  isCategoryPage=false;;

  constructor(private productService: ProductService,private categoryService: CategoriesService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
      this.route.params.subscribe(params=>{
        params['categoryId']? this._getProducts([params['categoryId']]) : this._getProducts();
        params['categoryId']? this.isCategoryPage=true : this.isCategoryPage=false;
      })
      this._getCategories();
  }

  private _getProducts(categoryFilter?:string[]){
    this.productService.getProduct(categoryFilter).subscribe(product=>{
      this.products=product;
      // console.log(this.products);
    })
  }

  private _getCategories(){
    this.categoryService.getCategory().subscribe(category=>{
      this.categories=category;
    })
    
  }

  categoryFilter(){
    const selectedCategory=this.categories.filter(category=>category.checked).map(category=> category.id);
    this._getProducts(selectedCategory);
  }


}
