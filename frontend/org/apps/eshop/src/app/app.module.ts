import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductsModule } from '@org/products';
import { OrdersModule } from '@org/orders';


import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';  
import { UiModule } from '@org/ui';
import { HttpClientModule } from '@angular/common/http';




const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    }
];

@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent],
    imports: [BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes),
        ProductsModule,
        OrdersModule,UiModule,
        AccordionModule,
        HttpClientModule,
        ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
