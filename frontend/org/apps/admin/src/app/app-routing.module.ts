import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule ,Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoriesService } from '@org/products';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { AuthGaurd, JwtInterceptor, UsersModule } from '@org/users';


const routes:Routes=[
    {
        path:'',
        component:ShellComponent,
        // Route Gaurd
        canActivate:[AuthGaurd],
        children:[
            {path:'',component:DashboardComponent},
            {path: 'categories', component: CategoryListComponent},
            {path: 'categories/form', component: CategoriesFormComponent},
            {path: 'categories/form/:id', component: CategoriesFormComponent},
            {path: 'products', component: ProductsListComponent},
            {path: 'products/form', component: ProductsFormComponent},
            {path: 'products/form/:id', component: ProductsFormComponent},
            {path: 'users', component: UsersListComponent},
            {path: 'users/form', component: UsersFormComponent},
            {path: 'users/form/:id', component: UsersFormComponent},
            {path: 'orders', component: OrdersListComponent},
            {path: 'orders/:id', component: OrdersDetailComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes),],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRoutingModule { }
