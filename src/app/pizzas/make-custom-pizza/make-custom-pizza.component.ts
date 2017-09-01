import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-make-custom-pizza',
  templateUrl: './make-custom-pizza.component.html',
  styleUrls: ['./make-custom-pizza.component.css']
})
export class MakeCustomPizzaComponent implements OnInit {
 public flours: string[];
  public diaries: string[];
  public meats: string[];


  constructor() {
    this.flours = ['traditional', 'italian style', 'thin and crispy'];
    this.diaries = ['white cheese', 'yellow cheese', 'mozarella'];
    this.meats = ['salami', 'backon', 'ham'];
  }

  chooseProduct(products) {
    for (let i = 0; i < products.length; i++) {
      console.log(products[i]);
    }
  }

  testClick() {
    console.log('test');
  }

  ngOnInit() {
  }

}


