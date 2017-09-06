import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { CustomPizza } from './custom-pizza.model';

@Component({
  selector: 'app-make-custom-pizza',
  templateUrl: './make-custom-pizza.component.html',
  styleUrls: ['./make-custom-pizza.component.css']
})
export class MakeCustomPizzaComponent implements OnInit {
  public customPizza: CustomPizza;
  public sizes: string[];
  public flours: string[];
  public dairies: string[];
  public meats: string[];
  public sauces: string[];

  selectedSize = '';
  selectedFlour = '';
  selectedDairies = '';
  selectedMeats = [];
  selectedSauces = [];


  constructor() {
    this.sizes = ['small', 'medium', 'large', 'family'];
    this.flours = ['traditional', 'italian style', 'thin and crispy'];
    this.dairies = ['white cheese', 'yellow cheese', 'mozarella'];
    this.meats = ['salami', 'backon', 'ham'];
    this.sauces = ['garlic', 'tomato'];
  }


  ngOnInit() {
  }

}


