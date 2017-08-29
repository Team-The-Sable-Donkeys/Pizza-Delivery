import { UsersService } from './../../services/users/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordsMatch = true;
  errorMessage;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  registerUser(user) {
    if (user.password !== user.confirmPassword) {
      this.passwordsMatch = false;
    }
    if (this.passwordsMatch) {
      return this.usersService.registerUser(user)
        .subscribe();
    } else {
      this.errorMessage = 'Passwords must match!';
    }
  }

}
