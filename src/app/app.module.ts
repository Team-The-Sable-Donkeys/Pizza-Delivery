import { MyCurrencyPipe } from './pipes/mycurrency.pipe';
import { AdminGuard } from './services/auth/admin-guard.service';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { AuthGuard } from './services/auth/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyCurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PizzasModule,
    HttpModule,
    SharedModule,
    UsersModule,
    CartModule,
    OrdersModule,
    AlertModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
