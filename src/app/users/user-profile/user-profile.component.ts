import { UserOrdersComponent } from './user-orders/user-orders.component';
import { Component, OnInit, Inject, Optional } from '@angular/core';

import { PizzaService } from '../../pizza.service';
import { UpdateUserProfileComponent } from './update-user-profile/update-user-profile.component';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public currentUser;
  public currentAddress;

  constructor(private pizzaService: PizzaService,
    private dialog: MdDialog) { }

  viewMyOrders() {
    const width = window.outerWidth * 0.6;
    const height = window.outerHeight * 0.4;
      const checkOutDialog = this.dialog.open(UserOrdersComponent, {
        height: height + 'px',
        width: width + 'px',
      });
    }

  ngOnInit() {
    this.currentUser = this.pizzaService.getFixedUser()
      .subscribe((u) => {
        this.currentUser = u;
      });
    this.currentAddress = this.pizzaService.getFixedUserAddress()
      .subscribe((a) => {
        this.currentAddress = a;
      });

  }

}
