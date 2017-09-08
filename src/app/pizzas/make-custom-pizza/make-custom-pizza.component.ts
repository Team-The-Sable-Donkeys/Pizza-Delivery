import { FinalizeCustomPizzaComponent } from './../finalize-custom-pizza/finalize-custom-pizza.component';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomPizza } from './custom-pizza.model';
import { MakeCustomPizzaService } from './make-custom-pizza.service';
import { AuthService } from '../../services/auth/auth.service';

import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


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

  selectedSize = [0, 0];
  selectedFlour = [0, 0];
  selectedDairies = [];
  selectedMeats = [];
  selectedSauces = [];

  constructor(private pizza: CustomPizza,
    private dialog: MdDialog,
    private customPizza: MakeCustomPizzaService,
    public toastr: ToastsManager,
    public auth: AuthService,
    vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  getNextId = (function () {
    let counter = 9;
    return function () {
      counter += 1;
      return counter;
    };
  })();

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
    this.pizza.id = this.getNextId();
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
    this.pizza.price = totalPrice;
    return totalPrice;
  }

  completePizza() {
    const width = window.outerWidth * 0.6;
    const height = window.outerHeight * 0.4;
    if (!this.auth.isLoggedIn()) {
      this.toastr.options = {
        animate: 'flyRight',
        positionClass: 'toast-top-full-width',
      };
      this.toastr.error('Your must sign in first', null, { toastLife: 2000 });
    } else {
      const checkOutDialog = this.dialog.open(FinalizeCustomPizzaComponent, {
        height: height + 'px',
        width: width + 'px',
      });
    }
  }

  clearData() {
    this.selectedSize[0] = 0;
    this.selectedFlour[0] = 0;
    this.selectedMeats.splice(0, this.selectedMeats.length);
    this.selectedDairies.splice(0, this.selectedDairies.length);
    this.selectedSauces.splice(0, this.selectedSauces.length);

    this.pizza.size[0] = 0;
    this.pizza.flour[0] = 0;
    this.pizza.meats.splice(0, this.pizza.meats.length);
    this.pizza.dairies.splice(0, this.pizza.dairies.length);
    this.pizza.sauces.splice(0, this.pizza.sauces.length);

    this.toastr.options = {
      animate: 'flyRight',
      positionClass: 'toast-top-full-width',
    };
    this.toastr.success('Your list has been successfuly cleared!', null, { toastLife: 2000 });
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


