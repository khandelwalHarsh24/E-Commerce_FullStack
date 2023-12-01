/* eslint-disable @typescript-eslint/no-unused-vars */
import {Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoriesService, Category } from '@org/products';
import {MessageService} from 'primeng/api';
import {timer} from 'rxjs';


@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup;
  isEditMode=false;

  
  isSubmitted=false;

  currentCategoryId: string;

  // make form reactive == FormBuilder
  constructor(private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private location: Location,
    private route:ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
      this.form=this.formBuilder.group({
        name:['',Validators.required],
        icon:['',Validators.required],
        color: ['#fff'],
      })

      this._checkEditMode();
  }


  onSubmit(){
    this.isSubmitted=true;
    if(this.form.invalid){
      return;
    }
    const category: Category={
      id: this.currentCategoryId,
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
      color: this.form.controls['color'].value
    }

    if(this.isEditMode){
      this._updateCategory(category);
    }
    else{
      this._addCategory(category);
    }
    
  }

  private _addCategory(category:Category){
   
    this.categoryService.createCategory(category).subscribe((category: Category)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:`Category ${category.name} is Created`});

      // rxjs used 
      timer(2000).toPromise().then(done=>{
        this.location.back();
      });
    },()=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Category is not Created'});
    });
  }

  private _updateCategory(category: Category){
    this.categoryService.updateCategory(category).subscribe((category:Category)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:`Category ${category.name} is Updated`});

      // rxjs used 
      timer(2000).toPromise().then(done=>{
        this.location.back();
      });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    },()=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Category is not Updated'});
    });
  }

  private _checkEditMode(){
    this.route.params.subscribe(params=>{
      if(params['id']){
        this.isEditMode=true;
        this.currentCategoryId=params['id'];
        this.categoryService.getcategory(params['id']).subscribe(category=>{
          this.form.controls['name'].setValue(category.name);
          this.form.controls['icon'].setValue(category.icon);
          this.form.controls['color'].setValue(category.color);
        })
      }
    })
  }

  getCategoryForm(){
    return this.form.controls;
  }

  

}
