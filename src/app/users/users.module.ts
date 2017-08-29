import { UsersService } from './../services/users/users.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [RegisterComponent],
  providers: [UsersService],
  exports: [RegisterComponent]
})
export class UsersModule { }
