import { PizzaService } from './../../pizza.service';
import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-cart]',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Output() totalPriceChanged = new EventEmitter();
  @Output() itemRemoved = new EventEmitter();
  @Input() pizza;

  subTotal: any = 0;
  prevTotal: any = 0;
  errorMessage;

  constructor(private PizzaService: PizzaService) {

  }

  ngOnInit() {
    this.prevTotal = this.subTotal;
    this.subTotal = this.pizza.price * this.pizza.quantity;
    this.subTotal = parseFloat(String(this.subTotal)).toFixed(2);

    this.totalPriceChanged.emit(this.subTotal - this.prevTotal);
  }

  changeSubTotal(ev) {
    const quantity = ev.target.value;
    if (+quantity < 0) {
      this.errorMessage = 'Please enter a valid quantity';
      ev.target.value = 1;
      return;
    }
    if (+quantity === parseInt(quantity, 10)) {
      this.pizza.quantity = +quantity;

      this.prevTotal = this.subTotal;
      this.subTotal = this.pizza.price * quantity;
      this.subTotal = parseFloat(String(this.subTotal)).toFixed(2);

      this.totalPriceChanged.emit(this.subTotal - this.prevTotal);

      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please enter a valid quantity';
    }
  }

  removeOneFromCart() {
    this.PizzaService.getUsers()
      .subscribe((users) => {
        const loggedUser = users.find((u) => u.authKey === localStorage.getItem('auth-key'));
        const body = {
          pizza: this.pizza,
          userId: loggedUser.id
        };
        this.PizzaService.removeFromCart(body)
          .subscribe();
      });
    this.totalPriceChanged.emit(this.prevTotal - this.subTotal);

    if (this.pizza.quantity > 1) {
      this.pizza.quantity--;
    } else {
    this.itemRemoved.emit(this.pizza.id);
    }
  }

  removeAllFromCart() {
    this.PizzaService.getUsers()
      .subscribe((users) => {
        const loggedUser = users.find((u) => u.authKey === localStorage.getItem('auth-key'));
        const body = {
          pizza: this.pizza,
          userId: loggedUser.id
        };
        this.PizzaService.removeFromCart(body)
          .subscribe();
      });
    this.totalPriceChanged.emit(this.prevTotal - this.subTotal);
    this.itemRemoved.emit(this.pizza.id);
  }

}
