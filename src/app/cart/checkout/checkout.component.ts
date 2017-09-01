import { Router } from '@angular/router';
import { UsersService } from './../../services/users/users.service';
import { PizzaService } from './../../pizza.service';
import { Component, OnInit, Inject } from '@angular/core';

// dialog
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  currentUser;
  city;
  street;

  constructor(public dialogRef: MdDialogRef<CheckoutComponent>,
    @Inject(MD_DIALOG_DATA) public data,
    public PizzaService: PizzaService,
    public usersService: UsersService,
    public router: Router) { }

  ngOnInit() {
    this.city = this.data.user.address.city;
    this.street = this.data.user.address.street;

    const left = window.outerWidth * 0.1;
    const top = window.outerHeight * 0.1;
    this.dialogRef.updatePosition({ top: top + 'px', left: left + 'px' });
  }

  sendOrder(value) {
    const currentDate = Date().split(' ').slice(0, 5);
    const currentTime = currentDate[4].split(':');
    const pizzasInOrder = [];
    this.data.pizzas.forEach((p) => {
      const currentPizza = {
        name: p.name,
        quantity: p.quantity,
      };
      pizzasInOrder.push(currentPizza);
    });
    const order = {
      address: value,
      pizzas: pizzasInOrder,
      date: {
        weekDay: currentDate[0],
        month: currentDate[1],
        day: currentDate[2],
        year: currentDate[3],
        hour: currentTime[0],
        minute: currentTime[1],
        second: currentTime[2]
      },
      price: this.data.totalPrice
    };
    this.PizzaService.sendOrder(order)
      .subscribe();
    this.usersService.clearUserCart(this.data.user)
      .subscribe();
    this.closeDialog();
    this.router.navigate(['/home']);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
