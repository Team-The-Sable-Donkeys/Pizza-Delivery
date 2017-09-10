import { AuthHttp } from 'angular2-jwt';
import { OrdersService } from './../services/orders/orders.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

// dialog
import { MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MdDialogModule,
    BrowserAnimationsModule,
  ],
  declarations: [OrdersListComponent, OrderComponent, OrderDetailsComponent],
  providers: [OrdersService],
  // dialog
  entryComponents: [
    OrderDetailsComponent,
  ],
})
export class OrdersModule { }
