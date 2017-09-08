import { PizzaService } from './../../pizza.service';
import { CustomPizza } from './../make-custom-pizza/custom-pizza.model';
import { Component, OnInit, Inject, Input, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../services/auth/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-finalize-custom-pizza',
  templateUrl: './finalize-custom-pizza.component.html',
  styleUrls: ['./finalize-custom-pizza.component.css']
})
export class FinalizeCustomPizzaComponent implements OnInit {

  btnDisabled = false;

  constructor(public dialogRef: MdDialogRef<FinalizeCustomPizzaComponent>,
    private pizzaService: PizzaService,
    public customPizza: CustomPizza,
    public auth: AuthService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
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
        this.pizzaService.addToCart(body)
          .subscribe();
      })
      .subscribe(() => {
        this.btnDisabled = false;
      });

    this.toastr.options = {
      animate: 'flyRight',
      positionClass: 'toast-top-full-width',
    };
    this.toastr.success('Your list has been successfuly cleared!', null, { toastLife: 2000 });
    this.dialogRef.close();
  }

  discard() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
