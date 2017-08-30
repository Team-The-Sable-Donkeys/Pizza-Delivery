import { PizzaService } from './../../pizza.service';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[app-cart]',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() pizza;
  subTotal: any = 0;
  errorMessage;

  constructor(private PizzaService: PizzaService) {

  }

  ngOnInit() {
    this.subTotal = this.pizza.price * this.pizza.quantity;
  }

  changeSubTotal(ev) {
    const quantity = ev.target.value;
    if (+quantity < 0) {
      this.errorMessage = 'Please enter a valid quantity';
      ev.target.value = 1;
      return;
    }
    if (+quantity === parseInt(quantity, 10)) {
      this.subTotal = this.pizza.price * quantity;
      this.subTotal = parseFloat(String(this.subTotal)).toFixed(2);
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please enter a valid quantity';
    }
  }

  removeFromCart() {
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

  }

}
