import { Router } from '@angular/router';
import { UsersService } from './../../services/users/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  canRegister = true;
  errorMessage;
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
  }

  registerUser(user) {
    if (user.password !== user.confirmPassword) {
      this.canRegister = false;
      this.errorMessage = 'Passwords must match!';
    } else if (user.password !== undefined || user.confirmPassword !== undefined) {
      if (user.password.length < 5 || user.confirmPassword.length < 5) {
        this.canRegister = false;
        this.errorMessage = 'Your password must be atleast 5 symbols long!';
      }
    }
    if (user.password === '' || user.confirmPassword === '') {
      this.canRegister = false;
      this.errorMessage = 'Please enter a password!';
    }
    if (user.username === undefined) {
      this.canRegister = false;
      this.errorMessage = 'Please enter a username';
    } else if (user.username.length < 4) {
      this.canRegister = false;
      this.errorMessage = 'Your username must be atleast 4 symbols long!';
    }

    // Registration
    if (this.canRegister) {
      return this.usersService.registerUser(user)
        .subscribe(() => {
          this.router.navigate(['/login']);
        },
        (error) => {
          // fix here
          this.errorMessage = 'Username is already is use!';
        });
    }
  }

}
