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

  getPrice() {
    let price = 0;
    this.pizzas.forEach((p) => {
      price += p.price;
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
  }

}
