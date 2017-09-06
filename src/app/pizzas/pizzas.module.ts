import { PizzaService } from './../pizza.service';
import { PizzaComponent } from './pizza/pizza.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { PizzasRoutingModule } from './pizzas-routing.module';
import { PizzaDetailsComponent } from './pizza-details/pizza-details.component';
import { MakeCustomPizzaComponent } from './make-custom-pizza/make-custom-pizza.component';

@NgModule({
  imports: [
    CommonModule,
    PizzasRoutingModule,
    FormsModule
  ],
  declarations: [
    PizzaComponent,
    PizzaListComponent,
    PizzaDetailsComponent,
    MakeCustomPizzaComponent
  ],
  providers: [PizzaService]
})
export class PizzasModule { }
