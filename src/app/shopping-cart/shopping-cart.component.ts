import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { HttpClient } from '@angular/common/http';
import { Checkout } from '../model/checkout';
import { PlacedProduct } from '../model/placedProduct';
import { isNgContent } from '@angular/compiler';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart:any;
  quantity=[];
  totalCost=0;
  currentCost = 0;
  promoCode:string= '';
  couponValid = false;
  couponInvalid = false;
  checkoutForm: Checkout = new Checkout();
  
  constructor(private service: ServiceService,
              private http: HttpClient,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.cart = this.service.cart
    this.cart.forEach(item => {
      this.quantity.push(item.quantity)
    });
    this.calculateTotal();
  }

  calculateTotal(){
    var total = 0;
    for(var i=0; i<this.cart.length; i++){
      total = total + (this.cart[i].price * this.quantity[i]);
    }
    this.totalCost = parseInt(total.toFixed(2));
    this.currentCost = parseInt(total.toFixed(2));
  }

  applyPromo(){
    const validPromos = this.service.promoCodes;
    validPromos.forEach(promo =>{
      if(this.promoCode === promo){
        this.couponValid=true;
        this.totalCost= this.totalCost - (20/100)*this.totalCost;
        return;
      } 
    }) 
      if(!this.couponValid) this.couponInvalid=true;
  }


  checkout(){
    this.cart.forEach(product=>{
      let item = new PlacedProduct();
      item.ProductName =product.name;
      item.price = product.price; 
      this.checkoutForm.products.push(item);
    })
    this.checkoutForm.totalPrice = this.totalCost;
    this.http.post('https://formspree.io/f/xayvjgwn', this.checkoutForm).subscribe(resp=>{
      console.log(resp);   
      alert("Order Placed")
      this.service.orderPlaced = true;
      this.router.navigate(['/shop']); 
    })
  }


  removeItem(event){
    var id = event.target.id;
    var item = this.cart[id];
    this.totalCost =  parseInt((this.totalCost - item.price).toFixed(2));
    this.currentCost =  parseInt((this.currentCost - item.price).toFixed(2));  
    this.cart.splice(id,1);
    this.quantity.splice(id,1);
  }

  increaseValue(event) {
    var id = event.target.id;
    this.quantity[id]++;
    this.calculateTotal();
  }
  
  decreaseValue(event) {
    var id = event.target.id;
    if(this.quantity[id]!=1){
      this.quantity[id]--;
    }
    this.calculateTotal();
  }

}
