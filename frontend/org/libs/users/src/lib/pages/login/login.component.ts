import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})

export class LoginComponent implements OnInit{

  loginFormGroup!: FormGroup;
  isSubmitted=false;
  authError=false;
  authMessage="Email Or Password is wrong"

  constructor(private formBuilder: FormBuilder,private authService: AuthService,
    private localStorage: LocalStorageService,private router: Router){}

  ngOnInit(): void {
      this._initForm();
  }

  private _initForm(){
    this.loginFormGroup=this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    })
  }

  loginForm(){
    return this.loginFormGroup.controls;
  }

  onSubmit(){
    this.isSubmitted=true;
    if(this.loginFormGroup.invalid) return;
    this.authService.login(this.loginForm()['email'].value,this.loginForm()['password'].value).subscribe(user=>{
      this.authError=false;
      this.localStorage.setToken(user.token);
      this.router.navigate(['/']);
    },(error: HttpErrorResponse)=>{
      this.authError=true;
      if(error.status!==400){
        this.authMessage='Error in Server, Please try again'
      }
      
    });
  }
}
