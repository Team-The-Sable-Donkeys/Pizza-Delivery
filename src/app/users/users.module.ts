import { AuthGuard } from './../services/auth/auth-guard.service';
import { AuthService } from './../services/auth/auth.service';
import { UsersService } from './../services/users/users.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [UsersService, AuthService, AuthGuard],
  exports: [RegisterComponent, LoginComponent]
})
export class UsersModule { }
