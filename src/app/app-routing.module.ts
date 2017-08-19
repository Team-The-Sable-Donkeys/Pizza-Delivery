import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzaListComponent } from './pizzas/pizza-list/pizza-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'pizzas', pathMatch: 'full' },
  { path: 'pizzas', loadChildren: './pizzas/pizzas.module.ts#PizzasModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
