import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomPizza } from './custom-pizza.model';

@Component({
  selector: 'app-make-custom-pizza',
  templateUrl: './make-custom-pizza.component.html',
  styleUrls: ['./make-custom-pizza.component.css']
})
export class MakeCustomPizzaComponent implements OnInit {

 public sizes = [
      {
        type: 'small',
        price: 1
      },
      {
        type: 'medium',
        price: 2
      },
      {
        type: 'large',
        price: 3
      },
      {
        type: 'family',
        price: 4
      }
  ];

  public flours = [
    {
      type: 'traditional',
      price: 5
    },
    {
      type: 'italian style',
      price: 6
    },
    {
      type: 'thin and crispy',
      price: 7
    },
  ];
  public meats = [
    {
      type: 'salami',
      price: 5
    },
    {
      type: 'backon',
      price: 4
    },
    {
      type: 'ham',
      price: 6
    },
  ];
  public dairies = [
    {
      type: 'white cheese',
      price: 3
    },
    {
      type: 'yellow cheese',
      price: 4
    },
    {
      type: 'mozarella',
      price: 5
    },
  ];
  public sauces = [
    {
      type: 'garlic',
      price: 3
    },
    {
      type: 'tomato',
      price: 2
    },
  ];

  selectedSize = [''];
  selectedFlour = [''];
  selectedDairies = [];
  selectedMeats = [];
  selectedSauces = [];

  constructor(private pizza: CustomPizza) {}

  selectSize(e, size) {
    if (e.target.checked) {
      this.selectedSize[0] = size;
    } else {
      const index = this.selectedSize.indexOf(size, 0);
      if (index > -1) {
        this.selectedSize.splice(index, 1);
      }
    }
  }

  selectFlour(e, flour) {
    if (e.target.checked) {
      this.selectedFlour[0] = flour;
    } else {
      const index = this.selectedFlour.indexOf(flour, 0);
      if (index > -1) {
        this.selectedFlour.splice(index, 1);
      }
    }
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

  createCustomPizza() {
    this.pizza.size[0] = this.selectedSize[0];
    this.pizza.flour[0] = this.selectedFlour[0];
    let meatPrice = 0;
    let dairiesPrice = 0;
    let saucePrice = 0;

    for (let i = 0; i < this.selectedDairies.length; i += 1) {
      this.pizza.dairies[i] = this.selectedDairies[i];
      dairiesPrice += this.pizza.dairies[i].price;
    }

    for (let i = 0; i < this.selectedMeats.length; i += 1) {
      this.pizza.meats[i] = this.selectedMeats[i];
      meatPrice += this.pizza.meats[i].price;
    }

    for (let i = 0; i < this.selectedSauces.length; i += 1) {
      this.pizza.sauces[i] = this.selectedSauces[i];
      saucePrice += this.pizza.sauces[i].price;
    }

    const totalPrice = this.pizza.size[0].price + this.pizza.flour[0].price + meatPrice + dairiesPrice + saucePrice;
    console.log(totalPrice);
    return totalPrice;
  }


  ngOnInit() {
  }

}


