import { PizzaService } from './../../pizza.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  pizzas;
  totalPrice: any = 0;
  constructor(private PizzaService: PizzaService) { }

  ngOnInit() {
    this.PizzaService.getUsers()
      .subscribe((users) => {
        const loggedUser = users.find((u) => u.authKey === localStorage.getItem('auth-key'));
        this.pizzas = loggedUser.cart;
      });
  }

  updateTotalPrice(value) {
    console.log(value);
    if (this.totalPrice !== value) {
      this.totalPrice = parseFloat(String(+this.totalPrice + +value)).toFixed(2);
    }
  }

}
