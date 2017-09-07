import { FinalizeCustomPizzaComponent } from './../finalize-custom-pizza/finalize-custom-pizza.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomPizza } from './custom-pizza.model';
import { MakeCustomPizzaService } from './make-custom-pizza.service';

import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';


@Component({
  selector: 'app-make-custom-pizza',
  templateUrl: './make-custom-pizza.component.html',
  styleUrls: ['./make-custom-pizza.component.css']
})
export class MakeCustomPizzaComponent implements OnInit {

  sizes = [];
  flours = [];
  meats = [];
  dairies = [];
  sauces = [];

  selectedSize = [''];
  selectedFlour = [''];
  selectedDairies = [];
  selectedMeats = [];
  selectedSauces = [];

  constructor(private pizza: CustomPizza, private dialog: MdDialog, private customPizza: MakeCustomPizzaService) { }

  selectSize(e, size) {
    this.selectedSize[0] = size;
  }

  selectFlour(e, flour) {
    this.selectedFlour[0] = flour;
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
    return totalPrice;
  }

  completePizza() {
    const width = window.outerWidth * 0.6;
    const height = window.outerHeight * 0.4;
    const checkOutDialog = this.dialog.open(FinalizeCustomPizzaComponent, {
      height: height + 'px',
      width: width + 'px',
    });
  }

  ngOnInit() {

    this.customPizza.getSizes()
      .subscribe((value) => {
        this.sizes = value;
      });

    this.customPizza.getFlours()
      .subscribe((value) => {
        this.flours = value;
      });

    this.customPizza.getMeats()
      .subscribe((value) => {
        this.meats = value;
      });

    this.customPizza.getDairies()
      .subscribe((value) => {
        this.dairies = value;
      });

    this.customPizza.getSauces()
      .subscribe((value) => {
        this.sauces = value;
      });
  }

}


