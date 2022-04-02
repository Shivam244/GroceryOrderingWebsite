import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.scss']
})
export class ShoppingPageComponent implements OnInit {

  products = [];
  count = 0;
  FRUITS = "Fruits"
  VEGITABLES = "Vegitables"
  DAIRY = "Dairy"
  search = "";
  orderPlaced = this.service.orderPlaced;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.products = this.service.products;
    this.showAll();
  }


  showCatagoryItems(catagory){
    this.products = [];
    this.service.products.forEach(item=>{
      if(item.catagory == catagory){
        this.products.push(item);
      }
    })
  }

  searchItems(){
    this.products = this.service.products;
    let newProducts = [];
    this.products.filter(item =>{
      if(item.name.toLocaleLowerCase().includes(this.search)){
        newProducts.push(item);
      }
    })
    this.products = newProducts;
  }

  showAll(){
    this.products = this.service.products;
    this.shuffleArray(this.products);
  }
  

  addToCart(event){
    var item = this.products[event.target.id]
    this.count++;
    this.service.cart.push(item);
  }

   shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }



}
