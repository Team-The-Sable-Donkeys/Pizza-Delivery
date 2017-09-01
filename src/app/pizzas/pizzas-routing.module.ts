import { AuthGuard } from './../services/auth/auth-guard.service';
import { PizzaDetailsComponent } from './pizza-details/pizza-details.component';
import { PizzaComponent } from './pizza/pizza.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MakeCustomPizzaComponent } from './make-custom-pizza/make-custom-pizza.component';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'makePizza', component: MakeCustomPizzaComponent },
  { path: 'all', component: PizzaListComponent /*canActivate: [AuthGuard]*/},
  { path: ':id', component: PizzaDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PizzasRoutingModule { }
