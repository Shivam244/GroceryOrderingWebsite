import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingPageModule } from './shopping-page/shopping-page-module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShoppingPageComponent,
    ShoppingCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShoppingPageModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
