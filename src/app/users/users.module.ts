import { UserOrdersComponent } from './user-profile/user-orders/user-orders.component';
import { UpdateUserProfileComponent } from './user-profile/update-user-profile/update-user-profile.component';
import { AuthGuard } from './../services/auth/auth-guard.service';
import { AuthService } from './../services/auth/auth.service';
import { UsersService } from './../services/users/users.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersRoutingModule } from './users-routing.module';
import { MdDialogModule, MD_DIALOG_DATA } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    MdDialogModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    UpdateUserProfileComponent,
    UserOrdersComponent
],
  entryComponents: [
    UserOrdersComponent,
    UserProfileComponent
  ],
  providers: [UsersService],
  exports: [RegisterComponent, LoginComponent]
})
export class UsersModule { }
