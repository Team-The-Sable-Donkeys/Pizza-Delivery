import { AdminGuard } from './services/auth/admin-guard.service';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { AuthGuard } from './services/auth/auth-guard.service';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about/about.component';
import { AboutContactComponent } from './about/about-contact/about-contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzaListComponent } from './pizzas/pizza-list/pizza-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pizzas', loadChildren: './pizzas/pizzas.module.ts#PizzasModule' },
  { path: 'profile', loadChildren: './users/users.module.ts#UsersModule', canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: AboutContactComponent },
  { path: 'cart', component: CartListComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersListComponent, canActivate: [AdminGuard] },
  { path: '**', component: UnauthorizedComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
