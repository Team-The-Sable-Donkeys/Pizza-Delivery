import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list/cart-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [CartListComponent, CartComponent]
})
export class CartModule { }
