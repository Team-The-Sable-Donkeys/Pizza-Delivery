import { OrdersService } from './../../services/orders/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders;
  constructor(public ordersService: OrdersService) { }

  ngOnInit() {
    this.ordersService.getOrders()
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

}
