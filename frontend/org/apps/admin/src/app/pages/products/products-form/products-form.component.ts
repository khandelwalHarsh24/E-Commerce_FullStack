import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Product, ProductService } from '@org/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit{
  isEditMode=false;
  isSubmitted=false;
  categories=[];
  form: FormGroup;
  imageDisplay:string | ArrayBuffer;
  currentProductId: string;


  constructor(private formBuilder: FormBuilder,private categoryService: CategoriesService,
    private productService: ProductService,
    private messageService: MessageService,
    private location:Location,private route: ActivatedRoute){}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm(){
    this.form=this.formBuilder.group({
      name:['',Validators.required],
      brand:['',Validators.required],
      price:['',Validators.required],
      category:['',Validators.required],
      countInStock:['',Validators.required],
      description:[''],
      richDescription:[''],
      image:['',Validators.required],
      isFeatured:[false],
    })
  }

  private _checkEditMode(){
    this.route.params.subscribe(params=>{
      if(params['id']){
        this.isEditMode=true;
        this.currentProductId=params['id'];
        this.productService.getproduct(params['id']).subscribe(product=>{
           this.getProductForm()['name'].setValue(product.name);
           this.getProductForm()['category'].setValue(product.category);
           this.getProductForm()['brand'].setValue(product.brand);
           this.getProductForm()['price'].setValue(product.price);
           this.getProductForm()['countInStock'].setValue(product.countInStock);
           this.getProductForm()['isFeatured'].setValue(product.isFeatured);
           this.getProductForm()['description'].setValue(product.description);
           this.getProductForm()['richDescription'].setValue(product.richDescription);
           this.imageDisplay=product.image;
           this.getProductForm()['image'].setValidators([]);
           this.getProductForm()['image'].updateValueAndValidity();
        })
      }
    })
  }
 
  private _getCategories(){
    this.categoryService.getCategory().subscribe(category=>{
      this.categories=category;
    });
  }

  onImageUpload(event){
    const file=event.target.files[0];
    if(file){
      // put image file by default
      this.form.patchValue({image:file});
      this.form.get('image').updateValueAndValidity();
      const fileReader=new FileReader();
      fileReader.onload=()=>{
        this.imageDisplay=fileReader.result;
      }

      fileReader.readAsDataURL(file);
    }
  }
  onSubmit(){
    this.isSubmitted=true;
    if(this.form.invalid) return;
    const formData=new FormData();
    Object.keys(this.getProductForm()).map((key)=>{
      // console.log(key);
      // console.log(this.getProductForm()[key].value);
      formData.append(key,this.getProductForm()[key].value);
    })
    
    if(this.isEditMode){
      this._updateProduct(formData);
    }
    else{
      this._addProduct(formData);
    }
  };


  private _addProduct(formData:FormData){
   
    this.productService.createProduct(formData).subscribe((product: Product)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:`Product is Created`});

      // rxjs used 
      timer(2000).toPromise().then(done =>{
        this.location.back();
      });
    },()=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Product is not Created'});
    });
  }


  private _updateProduct(formData:FormData,){
    this.productService.updateProduct(formData,this.currentProductId).subscribe(()=>{
      this.messageService.add({severity:'success', summary:'Success', detail:`Product is Updated`});

      // rxjs used 
      timer(2000).toPromise().then(done=>{
        this.location.back();
      });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    },()=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Product is not Updated'});
    });
  }

  getProductForm(){
    return this.form.controls;
  }
}
