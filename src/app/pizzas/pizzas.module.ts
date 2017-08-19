import { PizzaService } from './../pizza.service';
import { PizzaComponent } from './pizza/pizza.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PizzasRoutingModule } from './pizzas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PizzasRoutingModule
  ],
  declarations: [
    PizzaComponent,
    PizzaListComponent
  ],
  providers: [PizzaService]
})
export class PizzasModule { }
