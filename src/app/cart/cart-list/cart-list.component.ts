import { CheckoutComponent } from './../checkout/checkout.component';
import { PizzaService } from './../../pizza.service';
import { Component, OnInit } from '@angular/core';

// dialog
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  pizzas;
  totalPrice: any = 0;
  loggedUser;
  constructor(private PizzaService: PizzaService,
    private dialog: MdDialog) { }

  ngOnInit() {
    this.PizzaService.getUsers()
      .subscribe((users) => {
        const loggedUser = users.find((u) => u.authKey === localStorage.getItem('auth-key'));
        this.loggedUser = loggedUser;
        this.pizzas = loggedUser.cart;
      });
  }

  getPrice() {
    let price = 0;
    this.pizzas.forEach((p) => {
      price += p.price * p.quantity;
    });
    return price;
  }

  updateTotalPrice(value) {
    if (this.totalPrice !== value) {
      this.totalPrice = parseFloat(String(+this.totalPrice + +value)).toFixed(2);
    }
  }

  updateCartList(id) {
    this.pizzas = this.pizzas.filter((p) => +p.id !== +id);
    this.totalPrice = this.getPrice();
    this.totalPrice = parseFloat(String(this.totalPrice)).toFixed(2);
  }

  // checkout
  checkOut() {
    const width = window.outerWidth * 0.8;
    const height = window.outerHeight * 0.6;
    const checkOutDialog = this.dialog.open(CheckoutComponent, {
      height: height + 'px',
      width: width + 'px',
      data: {
        pizzas: this.pizzas,
        user: this.loggedUser,
        totalPrice: this.totalPrice
      }
    });
  }

}
