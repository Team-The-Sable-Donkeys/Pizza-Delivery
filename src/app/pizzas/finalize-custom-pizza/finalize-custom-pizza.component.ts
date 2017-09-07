import { PizzaService } from './../../pizza.service';
import { CustomPizza } from './../make-custom-pizza/custom-pizza.model';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { AuthService } from '../../services/auth/auth.service';
import { ToasterService } from 'angular2-toaster/angular2-toaster';


@Component({
  selector: 'app-finalize-custom-pizza',
  templateUrl: './finalize-custom-pizza.component.html',
  styleUrls: ['./finalize-custom-pizza.component.css']
})
export class FinalizeCustomPizzaComponent implements OnInit {

  showLoader = false;
  btnDisabled = false;

  constructor(public dialogRef: MdDialogRef<FinalizeCustomPizzaComponent>,
    @Inject(MD_DIALOG_DATA) public data,
    private pizzaService: PizzaService,
    public customPizza: CustomPizza,
    public auth: AuthService,
  private toasterService: ToasterService) {

  }

  addToCart() {
    this.btnDisabled = true;

    this.pizzaService.getUsers()
      .map((users) => {
        const loggedUser = users.find((u) => u.authKey === localStorage.getItem('auth-key'));
        const body = {
          pizza: this.customPizza,
          userId: loggedUser.id
        };
        console.log(body.pizza);
        this.pizzaService.addToCart(body)
          .subscribe();
      })
      .subscribe(() => {
        this.btnDisabled = false;
      });

      this.dialogRef.close();
      this.toasterService.pop('success', 'Finished!', 'Your pizza has been successfully added to you cart.');

  }

  ngOnInit() {
  }

}
