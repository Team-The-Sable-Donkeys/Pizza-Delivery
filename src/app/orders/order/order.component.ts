import { MdDialog } from '@angular/material';
import { OrderDetailsComponent } from './../order-details/order-details.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() order;

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const width = window.outerWidth * 0.6;
    const height = window.outerHeight * 0.8;
    const checkOutDialog = this.dialog.open(OrderDetailsComponent, {
      height: height + 'px',
      width: width + 'px',
      data: {
        order: this.order
      }
    });
  }

}
