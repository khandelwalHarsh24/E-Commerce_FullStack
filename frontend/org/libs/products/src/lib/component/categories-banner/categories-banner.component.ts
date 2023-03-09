import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../model/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit, OnDestroy{

  categories: Category[]=[];
  endSubs$: Subject<any> =new Subject();
  constructor(private categoryService: CategoriesService){}

  ngOnInit(): void {
      this.categoryService.getCategory().pipe(takeUntil(this.endSubs$)).subscribe(category=>{
        this.categories=category;
      })
    
  }

  ngOnDestroy(): void {
      this.endSubs$.next('any');
      this.endSubs$.complete();
  }
}
