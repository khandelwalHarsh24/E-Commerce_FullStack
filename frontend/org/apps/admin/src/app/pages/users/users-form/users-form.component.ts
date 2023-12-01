import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@org/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import {Location} from '@angular/common';
import * as countriesLib from 'i18n-iso-countries';

declare const require

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})

export class UsersFormComponent implements OnInit {
  isEditMode=false;
  form:FormGroup;
  isSubmitted=false;
  countries=[];
  currentUserId:string;
  
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,
    private userService: UsersService,
    private messageService:MessageService,
    private location:Location ){}

  
  ngOnInit(): void {
    this._initForm();
    this._getCountries();
    this._checkEditMode();
  }


  private _initForm(){
    this.form=this.formBuilder.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      phone:['',Validators.required],
      isAdmin:[false],
      street:[''],
      apartment:[''],
      zip:[''],
      city:[''],
      country:[''],
      
    })
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

  private _checkEditMode(){
    this.route.params.subscribe(params=>{
      if(params['id']){
        this.isEditMode=true;
        this.currentUserId=params['id'];
        this.userService.getUser(params['id']).subscribe(user=>{
           this.getUserForm()['name'].setValue(user.name);
           this.getUserForm()['email'].setValue(user.email);
           this.getUserForm()['isAdmin'].setValue(user.isAdmin);
           this.getUserForm()['street'].setValue(user.street);
           this.getUserForm()['apartment'].setValue(user.apartment);
           this.getUserForm()['zip'].setValue(user.zip);
           this.getUserForm()['city'].setValue(user.city);
           this.getUserForm()['phone'].setValue(user.phone);
           this.getUserForm()['country'].setValue(user.country);
           this.getUserForm()['password'].setValidators([]);
           this.getUserForm()['password'].updateValueAndValidity();      
        })
      }
    })
  }

  
  
  



  onSubmit(){
    this.isSubmitted=true;
    if(this.form.invalid) return;

    const user:User={
      name: this.getUserForm()['name'].value,
      email: this.getUserForm()['email'].value,
      password: this.getUserForm()['password'].value,
      isAdmin: this.getUserForm()['isAdmin'].value,
      street: this.getUserForm()['street'].value,
      apartment: this.getUserForm()['apartment'].value,
      zip: this.getUserForm()['zip'].value,
      city: this.getUserForm()['city'].value,
      country: this.getUserForm()['country'].value,
      phone:this.getUserForm()['phone'].value
    }

    if(this.isEditMode){
      this._updateUser(user);
    }
    else{
      this._addUser(user);
    }
  }

  private _updateUser(user:User){
    this.userService.updateUser(user,this.currentUserId).subscribe(()=>{
      this.messageService.add({severity:'success', summary:'Success', detail:`User is Updated`});

      // rxjs used 
      timer(2000).toPromise().then(done=>{
        this.location.back();
      });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    },()=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'User is not Updated'});
    });
  }

  private _addUser(user:User){
    this.userService.createUser(user).subscribe((user:User)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:`User ${user.name} is Created`});

      // rxjs used 
      timer(2000).toPromise().then(done =>{
        this.location.back();
      });
    },()=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'User is not Created'});
    })
  }

  getUserForm(){
    return this.form.controls;
  }
}
