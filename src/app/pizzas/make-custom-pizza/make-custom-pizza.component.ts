import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  selectedDairies = [];
  selectedMeats = [];
  selectedSauces = [];

  container = [' '];


  constructor() {
    this.sizes = ['small', 'medium', 'large', 'family'];
    this.flours = ['traditional', 'italian style', 'thin and crispy'];
    this.dairies = ['white cheese', 'yellow cheese', 'mozarella'];
    this.meats = ['salami', 'backon', 'ham'];
    this.sauces = ['garlic', 'tomato'];
  }

  selectDairy(e, dairy) {
    if (e.target.checked) {
      this.selectedDairies.push(dairy);
    } else {
      const index = this.selectedDairies.indexOf(dairy, 0);
      if (index > -1) {
        this.selectedDairies.splice(index, 1);
      }
    }
  }

  selectMeat(e, meat) {
    if (e.target.checked) {
      this.selectedMeats.push(meat);
    } else {
      const index = this.selectedMeats.indexOf(meat, 0);
      if (index > -1) {
        this.selectedMeats.splice(index, 1);
      }
    }
  }

  selectSauce(e, sauce) {
    if (e.target.checked) {
      this.selectedSauces.push(sauce);
    } else {
      const index = this.selectedSauces.indexOf(sauce, 0);
      if (index > -1) {
        this.selectedSauces.splice(index, 1);
      }
    }
  }

  ngOnInit() {
  }

}


