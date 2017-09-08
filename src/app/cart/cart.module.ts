import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list/cart-list.component';

// dialog
import { MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdDialogModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  declarations: [CartListComponent, CartComponent, CheckoutComponent],
  // dialog
  entryComponents: [
    CheckoutComponent,
  ]
})
export class CartModule { }
