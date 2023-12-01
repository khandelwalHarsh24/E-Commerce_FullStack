import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes=[
  {path: 'login', component: LoginComponent}
]

@NgModule({
    imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule.forChild(routes), InputTextModule,ButtonModule],
    declarations: [
      LoginComponent
    ]
})
export class UsersModule {}
