import { PizzaService } from './../../../pizza.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  currentUser;
  currentOrders;
  currentPizzas;
  currentPrices;
  currentPizzaNames = [];

  constructor(public dialogRef: MdDialogRef<UserOrdersComponent>,
    public pizzaService: PizzaService) { }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {

    this.currentUser = this.pizzaService.getFixedUser()
      .subscribe((u) => {
        this.currentUser = u;
      });

    setTimeout(() => {
      this.currentOrders = this.pizzaService.getFixedOrder(this.currentUser.username)
        .subscribe((o) => {
          this.currentOrders = o;

          console.log(this.currentOrders);
          this.currentPizzas = this.currentOrders.map((p) => p.pizzas);
          this.currentPrices = this.currentOrders.map((n) => n.price);

          const months = this.currentOrders.map((m) => m.date.month);
          const years = this.currentOrders.map((m) => m.date.year);
          const days = this.currentOrders.map((m) => m.date.day);
          const hours = this.currentOrders.map((m) => m.date.hour);
          const mins = this.currentOrders.map((m) => m.date.minute);


          for (let i = 0; i < this.currentOrders.length; i += 1) {
            const pizza = this.currentPizzas[i].map((n) => n.name);
            const price = this.currentPrices[i];
            const month = months[i];
            const year = years[i];
            const day = days[i];
            const hour = hours[i];
            const min = mins[i];

            const toPush = pizza + ' -> ' + price + '$' + ' on: ' + day + ' ' + month + ' ' + year + ' at: ' + hour + ':' + min;

            this.currentPizzaNames.push(toPush);
          }
        });
    }, 500);

  }

}
